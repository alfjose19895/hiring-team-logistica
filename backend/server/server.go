package server

import (
	"com.funiber.org/database"
	"com.funiber.org/pkg"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"log"
	"os"
	"os/signal"
	"syscall"
)

// We will set up the middlewares to use in our server before mount the application routes or any other thing
func setupMiddlewares(app *fiber.App) {
	app.Use(cors.New(
		cors.Config{
			AllowHeaders: "Origin, Content-Type, Accept, Authorization, Access-Control-Allow-Headers",
			AllowOrigins: "localhost:3000,localhost:8080",
		}))
	if os.Getenv("ENABLE_LOGGER") == "true" {
		app.Use(logger.New(logger.Config{
			Format:     "${cyan}[${time}] ${white}[PID: ${pid}] STATUS ${red}${status} ${white}[METHOD ${cyan}${method}${white}] ${path}\n",
			TimeFormat: "02-Jan-2006",
			TimeZone:   "America/Guayaquil",
		}))
	}
}

// We will set up the server here for make it more readable and easy to maintain :)
func CreateServer() *fiber.App {
	if err := database.SetupDatabase(); err != nil {
		log.Fatal("Error while setting up the database: " + err.Error())
	}

	app := fiber.New(fiber.Config{
		Prefork: true, // While prefork is enabled, the server will spawn a child process for each CPU core. This will increase the performance of your application.
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			if e, ok := err.(*pkg.Error); ok {
				return ctx.Status(e.Status).JSON(e) // We will return the error in JSON format
			} else if e, ok := err.(*fiber.Error); ok {
				return ctx.Status(e.Code).JSON(pkg.Error{Status: e.Code, Code: "internal-server", Message: e.Message})
			} else {
				return ctx.Status(500).JSON(pkg.Error{Status: 500, Code: "internal-server", Message: err.Error()})
			}
		},
	})
	setupMiddlewares(app)

	// Healt check
	app.Get("/api", func(c *fiber.Ctx) error {
		return c.SendString("Health check passed for com.funiber.org package⚡!")
	})

	return app
}

// ListenApplication will listen the application in the port 5000 (you can change it and move it to .env file)
func ListenApplication(app *fiber.App) error {
	// 404 handler
	app.Use(func(c *fiber.Ctx) error {
		return c.Status(404).JSON(pkg.Error{Status: 404, Code: "NOT_FOUND", Message: "Not found"})
	})

	idleConnsClosed := make(chan struct{}) // We will use this channel to notify when the server is closed
	go func() {
		// The proposal is to use the SIGTERM signal to close the server gracefully :)
		// server graceful shutdown = server that will wait for all the requests to finish before closing the server
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt, syscall.SIGTERM) // Catch the SIGTERM signal
		<-sigint                                             // Wait for the SIGTERM signal

		if err := app.Shutdown(); err != nil {
			log.Fatal("Error while shutting down the server:" + err.Error())
		}
		defer close(idleConnsClosed)

		if err := database.CloseConnection(); err != nil {
			log.Fatal("Error while closing the database connection:" + err.Error())
		}
		log.Println("Server gracefully stopped")
	}()

	Url, _ := pkg.ConnectionURLBuilder("fiber")
	if err := app.Listen(Url); err != nil {
		log.Fatal("Error while starting the server:" + err.Error())
	}

	<-idleConnsClosed
	return nil
}

package main

import (
	"com.funiber.org/server"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {
	app := server.CreateServer()

	if !fiber.IsChild() {
		// Due to the prefork is enabled, we will only automatically migrate the database in the parent process
		// TODO: Migrate the database
	}

	// TODO: Setup routes.

	if err := server.ListenApplication(app); err != nil {
		log.Fatal("Error while listening the application:" + err.Error())
	}

}

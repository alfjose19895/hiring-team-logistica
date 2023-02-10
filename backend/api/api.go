package api

import (
	"com.funiber.org/api/auth"
	"com.funiber.org/api/products"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	v1 := app.Group("/api/v1")

	auth.Routes(v1)
	products.Routes(v1)
}

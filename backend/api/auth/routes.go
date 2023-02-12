package auth

import "github.com/gofiber/fiber/v2"

func Routes(route fiber.Router) {
	auth := route.Group("/auth")
	auth.Post("/login", Login)

	account := route.Group("/account")
	account.Get("/:id", GetAccount)
}

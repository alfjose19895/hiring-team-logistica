package stats

import "github.com/gofiber/fiber/v2"

func Routes(route fiber.Router) {
	route.Get("/stats", GetGlobalStats)
}

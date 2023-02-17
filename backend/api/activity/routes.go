package activity

import "github.com/gofiber/fiber/v2"

func Routes(route fiber.Router) {
	activity := route.Group("/activity")
	activity.Get("/login", GetRecentLoginActivity)

	activity.Get("/recent", GetRecentActivity)
}

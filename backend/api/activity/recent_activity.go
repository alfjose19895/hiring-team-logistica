package activity

import (
	"com.funiber.org/database"
	"com.funiber.org/models"
	"com.funiber.org/pkg"
	"github.com/gofiber/fiber/v2"
)

func PushActivity(user *models.Account, activity string, typeofactivity string, ip string) {
	recent := models.RecentActivity{
		Username:     user.Username,
		Email:        user.Email,
		Activity:     activity,
		TypeActivity: typeofactivity,
		Ip:           ip,
	}
	database.DB.Create(&recent)
}

// Return the last 100 activities in JSON format
func GetRecentActivity(c *fiber.Ctx) error {
	db := database.DB
	var activities []models.RecentActivity
	err := db.Order("created_at asc").Limit(100).Find(&activities).Error
	if err != nil {
		return pkg.UnexpectedError("Error while querying the database:" + err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(&activities)
}

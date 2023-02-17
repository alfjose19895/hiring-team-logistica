package activity

import (
	"com.funiber.org/database"
	"com.funiber.org/models"
	"github.com/gofiber/fiber/v2"
)

func PushLoginActivity(user *models.Account, ip string, reason *string) {
	activity := models.RecentLoginActivity{
		Username: user.Username,
		Ip:       ip,
	}
	if reason != nil {
		activity.Success = false
		activity.ReasonIfFailed = *reason
	} else {
		activity.Success = true
	}
	database.DB.Create(&activity)
}

// Return the last 10 login activities in JSON format
func GetRecentLoginActivity(c *fiber.Ctx) error {
	// TODO: maybe add a filter for the last 24 hours or and specific username
	db := database.DB
	var loginActivities []models.RecentLoginActivity
	err := db.Order("created_at asc").Limit(10).Find(&loginActivities).Error
	if err != nil {
		return err
	}
	return c.JSON(loginActivities)
}

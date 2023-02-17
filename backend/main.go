package main

import (
	"com.funiber.org/api"
	"com.funiber.org/api/auth"
	"com.funiber.org/database"
	"com.funiber.org/models"
	"com.funiber.org/server"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {
	app := server.CreateServer()

	if !fiber.IsChild() {
		// Due to the prefork is enabled, we will only automatically migrate the database in the parent process
		err := database.DB.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci").
			AutoMigrate(
				&models.Account{},
				&models.Product{},
				&models.ProductCategory{},
				&models.ProductMeasurement{},
				&models.ProductStock{},
				&models.ProductHistorian{},
				// related to activity :)
				&models.RecentActivity{},
				&models.RecentLoginActivity{},
				&models.TypeMeasurement{},
			)
		if err != nil {
			log.Fatal("Error while migrating the database:" + err.Error())
		}
		// Mock the login user for testing purposes
	_:
		auth.MockLoginUser()
	}

	api.Setup(app)

	if err := server.ListenApplication(app); err != nil {
		log.Fatal("Error while listening the application:" + err.Error())
	}

}

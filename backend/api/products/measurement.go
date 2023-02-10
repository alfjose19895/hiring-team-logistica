package products

import (
	"com.funiber.org/database"
	"com.funiber.org/pkg"
	"github.com/gofiber/fiber/v2"
)

func CreateMeasure(ctx *fiber.Ctx) error {
	db := database.DB
	var measure ProductMeasurement

	if err := ctx.BodyParser(&measure); err != nil {
		return pkg.BadRequest("invalid request body: " + err.Error())
	}

	db.Where("name = ?", measure.Name).First(&measure)
	if measure.ID != 0 {
		return pkg.RegistryExists("measurement already exists")
	}

	db.Create(&measure)
	return ctx.Status(fiber.StatusCreated).JSON(measure)
}

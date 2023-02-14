package products

import (
	"com.funiber.org/database"
	"com.funiber.org/models"
	"com.funiber.org/pkg"
	"github.com/gofiber/fiber/v2"
)

func CreateMeasure(ctx *fiber.Ctx) error {
	db := database.DB
	var measure models.TypeMeasurement

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

func GetAllMeasures(ctx *fiber.Ctx) error {
	db := database.DB
	var measures []models.TypeMeasurement

	db.Find(&measures)

	return ctx.Status(fiber.StatusOK).JSON(measures)
}

func GetMeasure(ctx *fiber.Ctx) error {
	db := database.DB
	var measure models.TypeMeasurement
	id := ctx.Params("id")

	db.Where("id = ?", id).First(&measure)
	if measure.ID == 0 {
		return pkg.EntityNotFound("measurement not found")
	}

	return ctx.Status(fiber.StatusOK).JSON(measure)
}

func DeleteMeasure(ctx *fiber.Ctx) error {
	db := database.DB
	var measure models.TypeMeasurement
	id := ctx.Params("id")

	db.Where("id = ?", id).First(&measure)
	if measure.ID == 0 {
		return pkg.EntityNotFound("measurement not found")
	}

	db.Delete(&measure)

	return ctx.Status(fiber.StatusNoContent).JSON(nil)
}

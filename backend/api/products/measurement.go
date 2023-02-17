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

	// name or abbreviation must be unique
	db.Where("name = ? OR abbreviation = ?", measure.Name, measure.Abbreviation).First(&measure)
	if measure.ID != 0 {
		return pkg.RegistryExists("The name or abbreviation already exists")
	}

	db.Create(&measure)

	return ctx.Status(fiber.StatusCreated).JSON(measure)
}

func GetAllMeasures(ctx *fiber.Ctx) error {
	db := database.DB
	var measures []models.TypeMeasurement

	db.Find(&measures)

	return ctx.Status(fiber.StatusOK).JSON(&measures)
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

	// check if the measurement is being used by a product
	var product models.Product
	db.Where("type_measurement_id = ?", id).First(&product)
	if product.ID != 0 {
		return pkg.Unauthorized("The measurement is being used by a product")
	}

	db.Delete(&measure)

	return ctx.Status(fiber.StatusNoContent).JSON(nil)
}

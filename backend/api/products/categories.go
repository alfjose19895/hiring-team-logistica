package products

import (
	"com.funiber.org/database"
	"com.funiber.org/models"
	"com.funiber.org/pkg"
	"errors"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func CreateCategory(ctx *fiber.Ctx) error {
	db := database.DB
	var category models.ProductCategory

	if err := ctx.BodyParser(&category); err != nil {
		return pkg.BadRequest("invalid request body: " + err.Error())
	}

	db.Where("name = ?", category.Name).First(&category)
	if category.ID != 0 {
		return pkg.RegistryExists("category already exists")
	}

	db.Create(&category)

	return ctx.Status(fiber.StatusCreated).JSON(category)
}

func UpdateCategory(ctx *fiber.Ctx) error {
	db := database.DB
	id := ctx.Params("id")

	var category models.ProductCategory
	err := db.Where("id = ?", id).First(&category).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return pkg.EntityNotFound("category does not exist")
	} else if err != nil {
		return pkg.UnexpectedError(err.Error())
	}

	if err := ctx.BodyParser(&category); err != nil {
		return pkg.BadRequest("invalid request body: " + err.Error())
	}

	db.Save(&category)
	return ctx.Status(fiber.StatusOK).JSON(category)
}

func DeleteCategory(ctx *fiber.Ctx) error {
	db := database.DB
	id := ctx.Params("id")

	var category models.ProductCategory
	err := db.Where("id = ?", id).First(&category).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return pkg.EntityNotFound("category does not exist")
	} else if err != nil {
		return pkg.UnexpectedError(err.Error())
	}

	// soft delete
	db.Delete(&category)

	db.Exec("ALTER ALTER TABLE product_categories AUTO_INCREMENT=1")
	return ctx.Status(fiber.StatusNoContent).JSON(nil)
}

func GetCategories(ctx *fiber.Ctx) error {
	db := database.DB
	var categories []models.ProductCategory

	db.Find(&categories)
	return ctx.Status(fiber.StatusOK).JSON(categories)
}

package products

import (
	"com.funiber.org/database"
	"com.funiber.org/models"
	"com.funiber.org/pkg"
	"github.com/gofiber/fiber/v2"
)

func GetHistory(ctx *fiber.Ctx) error {
	db := database.DB
	product_code := ctx.Params("code")
	var product models.Product
	var history []models.ProductHistorian

	db.Where("code = ?", product_code).First(&product)
	if product.ID == 0 {
		return pkg.EntityNotFound("Product does not exist")
	}
	// preload relationship

	db.Where("product_id = ?", product.ID).Find(&history)
	if history == nil {
		return pkg.EntityNotFound("Product does not have history")
	}
	db.Preload("Product").Where("product_id = ?", product.ID).Find(&history)

	return ctx.Status(fiber.StatusOK).JSON(history)

}

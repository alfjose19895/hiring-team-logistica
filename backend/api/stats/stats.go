package stats

import (
	"com.funiber.org/database"
	"com.funiber.org/models"
	"github.com/gofiber/fiber/v2"
)

// Simple function to get the global stats of the application
func GetGlobalStats(ctx *fiber.Ctx) error {
	db := database.DB

	var stats models.GlobalStats

	db.Model(&models.Product{}).Count(&stats.Products)
	db.Model(&models.ProductCategory{}).Count(&stats.Categories)

	// join the stock table 'product_stock' with the products table and get the sum of the stock
	quantity := db.Table("products").Joins("JOIN product_stocks ON products.stock_id = product_stocks.id").Select("SUM(product_stocks.quantity)").Row()
	quantity.Scan(&stats.InStock)

	cost := db.Table("products").Joins("JOIN product_measurements ON products.measure_id = product_measurements.id").Select("SUM(product_measurements.cost)").Row()
	cost.Scan(&stats.Cost)

	return ctx.Status(fiber.StatusOK).JSON(stats)
}

package products

import "github.com/gofiber/fiber/v2"

func Routes(route fiber.Router) {
	products := route.Group("/products")

	products.Post("/create", CreateProduct)
	products.Get("/list", GetProducts)

	// Product categories
	categories := products.Group("/categories")
	categories.Post("/", CreateCategory)
	categories.Put("/:id", UpdateCategory)
	categories.Delete("/:id", DeleteCategory)
	categories.Get("/", GetCategories)

	//Product measurements
	measurements := route.Group("/measure")
	measurements.Post("/", CreateMeasure)
	measurements.Get("/", GetAllMeasures)
	measurements.Get("/:id", GetMeasure)
	measurements.Delete("/:id", DeleteMeasure)
}

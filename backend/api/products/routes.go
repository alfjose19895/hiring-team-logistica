package products

import "github.com/gofiber/fiber/v2"

func Routes(route fiber.Router) {
	products := route.Group("/products")

	products.Post("/", CreateProduct)
	products.Get("/", GetProducts)
	products.Delete("/:id", DeleteProduct)
	products.Put("/:id", UpdateProduct)

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

	// History
	history := products.Group("/history")
	history.Get("/:code", GetHistory)

	// seed
	seed := products.Group("/seed")
	seed.Get("/", Seed)
}

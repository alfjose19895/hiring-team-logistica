package products

import "github.com/gofiber/fiber/v2"

func Routes(route fiber.Router) {
	products := route.Group("/products")

	products.Post("/create", CreateProduct)
	products.Get("/list", GetProducts)

	// Product categories
	categories := products.Group("/categories")
	categories.Post("/create", CreateCategory)
	categories.Put("/update/:id", UpdateCategory)
	categories.Delete("/delete/:id", DeleteCategory)
	categories.Get("/", GetCategories)

	// Product measurements
	measurements := products.Group("/measure")
	measurements.Post("/create", CreateMeasure)
}

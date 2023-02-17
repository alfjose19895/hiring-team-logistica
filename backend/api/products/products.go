package products

import (
	"com.funiber.org/database"
	"com.funiber.org/models"
	"com.funiber.org/pkg"
	"github.com/gofiber/fiber/v2"
)

func CreateProduct(ctx *fiber.Ctx) error {
	db := database.DB

	// Input request
	var productInput ProductInput

	// Models to be used
	var productModel models.Product
	var productTypeMeasure models.TypeMeasurement
	var productCategory models.ProductCategory
	var productMeasurement models.ProductMeasurement
	var productStock models.ProductStock

	if err := ctx.BodyParser(&productInput); err != nil {
		return pkg.BadRequest("invalid request body: " + err.Error())
	}

	// Check if the product code already exists
	db.Where("code = ?", productInput.Code).First(&productModel)
	if productModel.ID != 0 {
		return pkg.RegistryExists("Product code already exists")
	}

	// Check if the category exists
	db.Where("id = ?", productInput.CategoryID).First(&productCategory)
	if productCategory.ID == 0 {
		return pkg.EntityNotFound("Category does not exist")
	}

	// Check if the measurement exists
	db.Where("id = ?", productInput.TypeMeasure).First(&productTypeMeasure)
	if productTypeMeasure.ID == 0 {
		return pkg.EntityNotFound("Measurement does not exist")
	}

	if productInput.InStock { // This is just an extra feature to show the quantity of the product based on the boolean value
		productStock.Quantity = *productInput.Quantity
	} else {
		productStock.Quantity = 0
	}

	db.Create(&productStock)

	// Create the product measures
	productMeasurement.Cost = productInput.Cost
	productMeasurement.Height = productInput.Height
	productMeasurement.Width = productInput.Width
	productMeasurement.Depth = productInput.Depth
	productMeasurement.Weight = productInput.Weight
	productMeasurement.Volume = productInput.Volume

	db.Create(&productMeasurement)

	// Set the product model
	productModel.Code = productInput.Code
	productModel.Name = productInput.Name
	productModel.InStock = productInput.InStock
	productModel.CategoryID = productCategory.ID
	productModel.TypeMeasurement = productTypeMeasure
	productModel.Measure = productMeasurement
	productModel.Stock = productStock

	// Create the product
	db.Create(&productModel)

	// create the history
	var history models.ProductHistorian
	history.Action = "Created"
	history.ProductID = productModel.ID
	history.Quantity = productStock
	history.Measure = productMeasurement
	history.TypeMeasurement = productTypeMeasure
	history.Category = productCategory

	db.Create(&history)

	// Set the product output model
	return ctx.Status(fiber.StatusCreated).JSON(productModel)
}

func GetProducts(ctx *fiber.Ctx) error {
	db := database.DB

	var products []models.Product
	db.Preload("Category").Preload("Measure").Preload("TypeMeasurement").Preload("Stock").Find(&products)

	// Set the output model
	var productsOutput []ProductOutput
	for _, product := range products {
		productsOutput = append(productsOutput, ProductOutput{
			ID:                  product.ID,
			Code:                product.Code,
			Name:                product.Name,
			InStock:             product.InStock,
			Category:            product.Category,
			TypeMeasure:         product.TypeMeasurement,
			CreatedAt:           product.CreatedAt,
			UpdatedAt:           product.UpdatedAt,
			ProductStock:        product.Stock,
			ProductMeasurements: product.Measure,
		},
		)
	}

	return ctx.Status(fiber.StatusOK).JSON(&productsOutput)
}

func DeleteProduct(ctx *fiber.Ctx) error {
	db := database.DB

	// Get the product id
	id := ctx.Params("id")

	// Check if the product exists
	var product models.Product
	var productStock models.ProductStock
	var productHistory models.ProductHistorian
	db.Where("id = ?", id).First(&product)
	if product.ID == 0 {
		return pkg.EntityNotFound("Product does not exist")
	}

	// with the id of the product, we can get the id of the stock and delete it
	db.Where("id = ?", product.StockID).First(&productStock)

	db.Where("product_id = ?", product.ID).First(&productHistory)

	db.Delete(&productStock)
	// delete the history
	db.Delete(&productHistory)

	// Delete the product
	db.Delete(&product)

	return ctx.Status(fiber.StatusNoContent).JSON(nil)
}

func UpdateProduct(ctx *fiber.Ctx) error {
	db := database.DB

	// Get the product id
	id := ctx.Params("id")

	// Check if the product exists
	var product models.Product

	db.Where("id = ?", id).Find(&product)

	if product.ID == 0 {
		return pkg.EntityNotFound("Product does not exist")
	}

	// Input request
	var productInput ProductUpdateInput

	if err := ctx.BodyParser(&productInput); err != nil {
		return pkg.BadRequest("invalid request body: " + err.Error())
	}

	// models to be used
	var productCategory models.ProductCategory
	var productTypeMeasure models.TypeMeasurement
	var productStock models.ProductStock
	var productMeasures models.ProductMeasurement

	// Check if the category exists
	db.Where("id = ?", productInput.CategoryID).First(&productCategory)
	if productCategory.ID == 0 {
		return pkg.EntityNotFound("Category does not exist")
	}

	// Check if the measurement exists
	db.Where("id = ?", productInput.TypeMeasure).First(&productTypeMeasure)
	if productTypeMeasure.ID == 0 {
		return pkg.EntityNotFound("Measurement does not exist")
	}

	// get the stock_id from products table
	db.Where("id = ?", product.StockID).First(&productStock)
	if productStock.ID == 0 {
		return pkg.EntityNotFound("Stock does not exist")
	}

	// get the measure_id from products table
	db.Where("id = ?", product.MeasureID).First(&productMeasures)
	if productMeasures.ID == 0 {
		return pkg.EntityNotFound("Measure does not exist")
	}

	// Update InStock
	db.Model(&product).Update("in_stock", productInput.InStock)

	// Update the product stock
	db.Model(&productStock).Updates(models.ProductStock{
		Quantity: productInput.Quantity,
	})

	// Update the product measures
	db.Model(&productMeasures).Updates(models.ProductMeasurement{
		Cost: productInput.Cost,
	})

	// Update the product
	db.Model(&product).Updates(models.Product{
		Name:              productInput.Name,
		CategoryID:        productInput.CategoryID,
		TypeMeasurementID: productInput.TypeMeasure,
	})

	// reload the relations
	db.Preload("Category").Preload("Measure").Preload("TypeMeasurement").Preload("Stock").Find(&product)

	// create the history
	var history models.ProductHistorian
	history.Action = "Updated"
	history.ProductID = product.ID
	history.Quantity = productStock
	history.Measure = product.Measure
	history.TypeMeasurement = product.TypeMeasurement
	history.Category = product.Category

	db.Create(&history)

	// Set the product output model
	return ctx.Status(fiber.StatusOK).JSON(&product)
}

func Seed(ctx *fiber.Ctx) error {
	SeedAll()
	return ctx.Status(fiber.StatusOK).JSON("Seeded")
}

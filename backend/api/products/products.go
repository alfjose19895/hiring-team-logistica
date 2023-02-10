package products

import (
	"com.funiber.org/database"
	"com.funiber.org/pkg"
	"github.com/gofiber/fiber/v2"
)

func CreateProduct(ctx *fiber.Ctx) error {
	db := database.DB

	var productInput ProductInput
	var productOutput ProductOutput
	var productModel Product
	var productCategory ProductCategory
	var productMeasurement ProductMeasurement
	var productStock ProductStock

	if err := ctx.BodyParser(&productInput); err != nil {
		return pkg.BadRequest("invalid request body: " + err.Error())
	}

	db.Where("code = ?", productInput.Code).First(&productModel)
	if productModel.ID != 0 {
		return pkg.RegistryExists("product already exists")
	}

	db.Where("id = ?", productInput.CategoryID).First(&productCategory)
	if productCategory.ID == 0 {
		return pkg.EntityNotFound("category does not exist")
	}

	db.Where("id = ?", productInput.MeasureID).First(&productMeasurement)
	if productMeasurement.ID == 0 {
		return pkg.EntityNotFound("measurement does not exist")
	}

	productModel.Code = productInput.Code
	productModel.Name = productInput.Name
	productModel.InStock = productInput.InStock
	productModel.CategoryID = productCategory.ID
	productModel.MeasureID = productMeasurement.ID

	db.Create(&productModel)

	productStock.ProductID = productModel.ID
	if productInput.InStock { // This is just an extra feature to show the quantity of the product based on the boolean value
		productStock.Quantity = 1
	} else {
		productStock.Quantity = 0
	}

	db.Create(&productStock)

	productOutput.ID = productModel.ID
	productOutput.Code = productModel.Code
	productOutput.Name = productModel.Name
	productOutput.InStock = productModel.InStock
	productOutput.CategoryID = productModel.CategoryID
	productOutput.MeasurementID = productModel.MeasureID
	productOutput.StockID = productStock.ID

	return ctx.Status(fiber.StatusCreated).JSON(productOutput)
}

func GetProducts(ctx *fiber.Ctx) error {
	db := database.DB

	var products []Product
	var productsOutput []ProductOutput

	db.Find(&products)

	for _, product := range products {
		var productOutput ProductOutput
		var productStock ProductStock
		if product.InStock {
			db.Where("product_id = ?", product.ID).First(&productStock)
		}
		productOutput.ID = product.ID
		productOutput.Code = product.Code
		productOutput.Name = product.Name
		productOutput.InStock = product.InStock
		productOutput.CategoryID = product.CategoryID
		productOutput.MeasurementID = product.MeasureID
		productOutput.StockID = productStock.ID

		productsOutput = append(productsOutput, productOutput)
	}

	return ctx.Status(fiber.StatusOK).JSON(productsOutput)
}

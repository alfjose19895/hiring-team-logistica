package products

import (
	"com.funiber.org/database"
	"com.funiber.org/models"
)

func SeedTypeMeasurement() {
	// The code below only seed the type measurement once a time.
	db := database.DB
	var typeMeasurement models.TypeMeasurement

	typeMeasurement.Name = new(string)
	*typeMeasurement.Name = "Kilogram"
	typeMeasurement.Abbreviation = new(string)
	*typeMeasurement.Abbreviation = "kg"
	typeMeasurement.Description = new(string)
	*typeMeasurement.Description = "Kilogram is a unit of mass in the metric system, equal to one thousand grams."

	db.Create(&typeMeasurement)
} // a

func SeedCategoryType() {
	// The code below only seed the category type once a time.
	db := database.DB
	var categoryType models.ProductCategory
	var _name = "Fruits"

	categoryType = models.ProductCategory{
		Name: _name,
	}

	var existingCategoryType models.ProductCategory
	db.Where("name = ?", categoryType.Name).First(&existingCategoryType)
	if existingCategoryType.ID != 0 {
		return
	}
	db.Create(&categoryType)
}

func SeedProduct() {
	db := database.DB

	// Input request
	var productInput ProductInput

	// Models to be used
	var productModel models.Product
	var productTypeMeasure models.TypeMeasurement
	var productCategory models.ProductCategory
	var productMeasurement models.ProductMeasurement
	var productStock models.ProductStock

	// Set the product input
	productInput.Code = "123456789"
	productInput.Name = "Apple"
	productInput.InStock = true
	productInput.Quantity = new(uint)
	*productInput.Quantity = 10
	productInput.Cost = new(float64)
	*productInput.Cost = 10.00
	productInput.Height = new(float64)
	*productInput.Height = 10.00
	productInput.Width = new(float64)
	*productInput.Width = 10.00
	productInput.Depth = new(float64)
	*productInput.Depth = 10.00
	productInput.Weight = new(float64)
	*productInput.Weight = 10.00
	productInput.Volume = new(float64)
	*productInput.Volume = 10.00
	productInput.TypeMeasure = 1
	productInput.CategoryID = 1

	// Check if the product code already exists
	db.Where("code = ?", productInput.Code).First(&productModel)

	// Check if the category exists
	db.Where("id = ?", productInput.CategoryID).First(&productCategory)

	// Check if the measurement exists
	db.Where("id = ?", productInput.TypeMeasure).First(&productTypeMeasure)

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

	// create the history :)
	var history models.ProductHistorian
	history.Action = "Created"
	history.ProductID = productModel.ID
	history.Quantity = productStock
	history.Measure = productMeasurement
	history.TypeMeasurement = productTypeMeasure
	history.Category = productCategory

	db.Create(&history)

}

func SeedAll() {
	SeedTypeMeasurement()
	SeedCategoryType()
	SeedProduct()
}

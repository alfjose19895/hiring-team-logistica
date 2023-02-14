package models

import "com.funiber.org/database"

type Product struct {
	database.DefaultModel
	Code       string             `gorm:"size:15; not null; index; unique" json:"code"`
	Name       string             `gorm:"size:80; not null" json:"name"`
	InStock    bool               `json:"in_stock"`
	Category   ProductCategory    `gorm:"foreignKey:CategoryID" json:"category"`
	CategoryID uint               `json:"category_id"`
	Measure    ProductMeasurement `gorm:"foreignKey:MeasureID" json:"measure"`
	MeasureID  uint               `json:"measure_id"`
}

type ProductCategory struct {
	database.DefaultModel
	Name string `gorm:"size:30; not null; index; unique" json:"name"`
}

type ProductMeasurement struct {
	database.DefaultModel
	TypeMeasurement   TypeMeasurement `gorm:"foreignKey:TypeMeasurementID" json:"type_measurement"`
	TypeMeasurementID uint            `json:"type_measurement_id"`
	Height            *float64        `gorm:"type:decimal(10,2)" json:"height"`
	Width             *float64        `gorm:"type:decimal(10,2)" json:"width"`
	Depth             *float64        `gorm:"type:decimal(10,2)" json:"depth"`
	Weight            *float64        `gorm:"type:decimal(10,2)" json:"weight"`
	WeightUnit        *uint           `gorm:"size:10" json:"weight_unit"`
	WeightMeasure     *string         `gorm:"size:10" json:"weight_measure"`
}

type ProductStock struct {
	database.DefaultModel
	Product   Product `gorm:"foreignKey:ProductID" json:"product"`
	ProductID uint    `json:"product_id"`
	Quantity  uint    `json:"quantity"`
}

// Products may have a historian of their stock incuding categories and measurements, so we can track the changes
type ProductHistorian struct {
	database.DefaultModel
	Product    Product            `gorm:"foreignKey:ProductID" json:"product"`
	ProductID  uint               `json:"product_id"`
	Quantity   ProductStock       `gorm:"foreignKey:QuantityID" json:"quantity"`
	QuantityID uint               `json:"quantity_id"`
	Category   ProductCategory    `gorm:"foreignKey:CategoryID" json:"category"`
	CategoryID uint               `json:"category_id"`
	Measure    ProductMeasurement `gorm:"foreignKey:MeasureID" json:"measure"`
	MeasureID  uint               `json:"measure_id"`
}

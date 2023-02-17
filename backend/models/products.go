package models

import "com.funiber.org/database"

type Product struct {
	database.DefaultModel
	Code              string             `gorm:"size:15; not null; index; unique" json:"code"`
	Name              string             `gorm:"size:80; not null" json:"name"`
	InStock           bool               `json:"in_stock"`
	Category          ProductCategory    `gorm:"foreignKey:CategoryID" json:"category"`
	CategoryID        uint               `json:"category_id"`
	TypeMeasurement   TypeMeasurement    `gorm:"foreignKey:TypeMeasurementID" json:"type_measurement"`
	TypeMeasurementID uint               `json:"type_measurement_id"`
	Measure           ProductMeasurement `gorm:"foreignKey:MeasureID" json:"measure"`
	MeasureID         uint               `json:"measure_id"`
	Stock             ProductStock       `gorm:"foreignKey:StockID" json:"stock"`
	StockID           uint               `json:"stock_id"`
}

type ProductCategory struct {
	database.DefaultModel
	Name string `gorm:"size:30; not null; unique" json:"name"`
}

type ProductMeasurement struct {
	database.DefaultModel
	Cost   *float64 `gorm:"type:decimal(10,2);default:0" json:"cost"`
	Height *float64 `gorm:"type:decimal(10,2);default:0" json:"height"`
	Width  *float64 `gorm:"type:decimal(10,2);default:0" json:"width"`
	Depth  *float64 `gorm:"type:decimal(10,2);default:0" json:"depth"`
	Weight *float64 `gorm:"type:decimal(10,2);default:0" json:"weight"`
	Volume *float64 `gorm:"type:decimal(10,2);default:0" json:"volume"`
}

type ProductStock struct {
	database.DefaultModel
	Quantity uint `json:"quantity"`
}

// Products may have a historian of their stock incuding categories and measurements, so we can track the changes
type ProductHistorian struct {
	database.DefaultModel
	Action            string             `gorm:"size:15; not null" json:"action"`
	Product           Product            `gorm:"foreignKey:ProductID" json:"product"`
	ProductID         uint               `json:"product_id"`
	Quantity          ProductStock       `gorm:"foreignKey:QuantityID" json:"quantity"`
	QuantityID        uint               `json:"quantity_id"`
	Category          ProductCategory    `gorm:"foreignKey:CategoryID" json:"category"`
	CategoryID        uint               `json:"category_id"`
	Measure           ProductMeasurement `gorm:"foreignKey:MeasureID" json:"measure"`
	MeasureID         uint               `json:"measure_id"`
	TypeMeasurement   TypeMeasurement    `gorm:"foreignKey:TypeMeasurementID" json:"type_measurement"`
	TypeMeasurementID uint               `json:"type_measurement_id"`
}

package products

import (
	"com.funiber.org/models"
	"time"
)

type ProductInput struct {
	Code        string `json:"code"`
	Name        string `json:"name"`
	InStock     bool   `json:"in_stock"`
	Quantity    *uint  `json:"quantity"`
	CategoryID  uint   `json:"category_id"`
	TypeMeasure uint   `json:"type_measure"` // main measure, like pounds, kilograms, meters, etc
	// measurements
	Cost   *float64 `json:"cost"`
	Height *float64 `json:"height"`
	Width  *float64 `json:"width"`
	Depth  *float64 `json:"depth"`
	Weight *float64 `json:"weight"`
	Volume *float64 `json:"volume"`
}

type ProductOutput struct {
	ID                  uint                      `json:"id"`
	Code                string                    `json:"code"`
	Name                string                    `json:"name"`
	InStock             bool                      `json:"in_stock"`
	Category            models.ProductCategory    `json:"category"`
	TypeMeasure         models.TypeMeasurement    `json:"measure_type"`
	CreatedAt           time.Time                 `json:"created_at"`
	UpdatedAt           time.Time                 `json:"updated_at"`
	ProductStock        models.ProductStock       `json:"stock_id"`
	ProductMeasurements models.ProductMeasurement `json:"measures"`
}

type HistoryInput struct {
	ProductID uint `json:"product_id"`
}

type HistoryOutput struct {
	ProductID uint                      `json:"product_id"`
	Quantity  models.ProductStock       `json:"quantity"`
	Category  models.ProductCategory    `json:"category"`
	Measure   models.ProductMeasurement `json:"measure"`
}

type ProductUpdateInput struct {
	ID          uint   `json:"id"`
	Code        string `json:"code"`
	Name        string `json:"name"`
	InStock     bool   `json:"in_stock"`
	Quantity    uint   `json:"quantity"`
	CategoryID  uint   `json:"category"`
	TypeMeasure uint   `json:"measure_type"` // main measure, like pounds, kilograms, meters, etc
	// measurements
	Cost   *float64 `json:"measures"`
	Height *float64 `json:"height"`
	Width  *float64 `json:"width"`
	Depth  *float64 `json:"depth"`
	Weight *float64 `json:"weight"`
	Volume *float64 `json:"volume"`
}

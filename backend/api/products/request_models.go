package products

type ProductInput struct {
	Code       string `json:"code"`
	Name       string `json:"name"`
	InStock    bool   `json:"in_stock"`
	CategoryID uint   `json:"category_id"`
	MeasureID  uint   `json:"measure_id"`
}

type ProductOutput struct {
	ID            uint   `json:"id"`
	Code          string `json:"code"`
	Name          string `json:"name"`
	InStock       bool   `json:"in_stock"`
	CategoryID    uint   `json:"category_id"`
	MeasurementID uint   `json:"measurement_id"`
	StockID       uint   `json:"stock_id"`
}

type HistoryInput struct {
	ProductID uint `json:"product_id"`
}

type HistoryOutput struct {
	ProductID uint               `json:"product_id"`
	Quantity  ProductStock       `json:"quantity"`
	Category  ProductCategory    `json:"category"`
	Measure   ProductMeasurement `json:"measure"`
}

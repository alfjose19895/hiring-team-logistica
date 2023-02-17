package models

type GlobalStats struct {
	Products   int64   `json:"products"`
	Categories int64   `json:"categories"`
	Cost       float64 `json:"cost"`
	InStock    int64   `json:"in_stock"`
}

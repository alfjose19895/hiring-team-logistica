package models

import "com.funiber.org/database"

// The type of measurement is used to define the type of how the product is measured. For example, a product can be measured in kilograms, liters, meters, etc.
type TypeMeasurement struct {
	database.DefaultModel
	Name         *string `gorm:"size:30; not null; unique" json:"name"`
	Abbreviation *string `gorm:"size:10; not null; index; unique" json:"abbreviation"`
	Description  *string `gorm:"size:100" json:"description"`
}

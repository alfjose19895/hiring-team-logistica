package models

import (
	"com.funiber.org/database"
	"time"
)

// Account model for the database (serve to auto-generate the table and the columns)
type Account struct {
	database.DefaultModel
	Username  string     `gorm:"unique" json:"username"`
	Email     string     `gorm:"unique" json:"email"`
	Password  string     `json:"password"`
	LastLogin *time.Time `json:"last_login"`
}

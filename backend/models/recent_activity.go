package models

import "com.funiber.org/database"

type RecentActivity struct {
	database.DefaultModel
	Username     string `gorm:"size:30; not null; index" json:"username"`
	Email        string `gorm:"size:100; not null; index" json:"email"`
	Activity     string `gorm:"size:100; not null" json:"activity"`
	TypeActivity string `gorm:"size: 12; not null" json:"type"`
	Ip           string `gorm:"size:30; not null" json:"ip"`
}

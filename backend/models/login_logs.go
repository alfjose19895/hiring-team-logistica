package models

import "com.funiber.org/database"

type RecentLoginActivity struct {
	database.DefaultModel
	Username       string `gorm:"size:30; not null; index" json:"username"`
	Ip             string `gorm:"size:30; not null" json:"ip"`
	Success        bool   `json:"success"`
	ReasonIfFailed string `gorm:"size:100; not null" json:"reason_if_failed"`
}

package database

import (
	"com.funiber.org/pkg"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"time"
)

var DB *gorm.DB

type DefaultModel struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `sql:"index" json:"deleted_at"`
}

// SetupDatabase is a function that will setup the database connection. It will also set the maximum number of connections
func SetupDatabase() error {
	var err error
	var config gorm.Config

	dsn, _ := pkg.ConnectionURLBuilder("mysql")

	if os.Getenv("ENABLE_GORM_LOGGER") == "true" {
		config = gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		}
	} else {
		config = gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		}
	}
	DB, err = gorm.Open(mysql.Open(dsn), &config)

	if err != nil {
		log.Fatalln("Error while connecting to the database: " + err.Error())
	}

	sqlDB, _ := DB.DB() // Get the underlying sql.DB object

	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	if !fiber.IsChild() { // It will show the message once, because when we prefork the app, there are too many child process :)
		fmt.Printf("[Parent PID %v] - Database connection established successfully", os.Getpid())
	}
	return nil
}

func CloseConnection() error {
	sqlDB, _ := DB.DB()
	if err := sqlDB.Close(); err != nil {
		return err
	}
	return nil
}

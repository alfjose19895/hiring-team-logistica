package pkg

import (
	"fmt"
	"os"
)

func ConnectionURLBuilder(n string) (string, error) {
	var url string

	switch n {
	case "mysql":
		{
			url = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
				os.Getenv("DB_USERNAME"),
				os.Getenv("DB_PASSWORD"),
				os.Getenv("DB_HOST"),
				os.Getenv("DB_PORT"),
				os.Getenv("DB_DATABASE"),
			)
		}
	default:
		return "", fmt.Errorf("database %s not supported", n)
	}
	return url, nil
}

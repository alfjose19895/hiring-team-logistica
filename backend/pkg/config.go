package pkg

import (
	"os"
)

// Config returns the value of the environment variable named by the key.
func Config(key string) string {
	return os.Getenv(key)
}

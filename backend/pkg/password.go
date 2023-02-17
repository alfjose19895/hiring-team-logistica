package pkg

import (
	"golang.org/x/crypto/bcrypt"
	"regexp"
)

var (
	// DefaultPasswordLength is the default length of the generated password.
	cost int = 12

	matchLower *regexp.Regexp = regexp.MustCompile(`[a-z]`)
	matchUpper *regexp.Regexp = regexp.MustCompile(`[A-Z]`)

	matchNumber  *regexp.Regexp = regexp.MustCompile(`[0-9]`)
	matchSpecial *regexp.Regexp = regexp.MustCompile(`[\!\@\#\$\%\^\&\*\(\\\)\-_\=\+\,\.\?\/\:\;\{\}\[\]~]`)
)

// Hash encrypts your password using the bcrypt algorithm.
func PasswordHash(password string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(password), cost)
}

func PasswordMatch(password, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}

// Integrity checks if the password is strong enough.
func PasswordIntegrity(password string) bool {
	if len(password) < 6 || len(password) > 255 {
		return false
	}

	score := 0

	if matchLower.MatchString(password) {
		score++
	}

	if matchUpper.MatchString(password) {
		score++
	}

	if matchNumber.MatchString(password) {
		score++
	}

	if matchSpecial.MatchString(password) {
		score++
	}

	return score >= 3
}

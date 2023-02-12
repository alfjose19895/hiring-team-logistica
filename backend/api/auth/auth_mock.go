package auth

import (
	"com.funiber.org/database"
	"com.funiber.org/pkg"
)

func MockLoginUser() error {
	// The code below only mock the login user once a time.
	db := database.DB
	var user Account

	// Since we will mock the main user, we don't need parsing anything :)
	user = Account{
		Username: "admin",
		Email:    "admin@domain.com",
		Password: "admin",
	}

	var existingUser Account
	db.Where("username = ? OR email = ?", user.Username, user.Email).First(&existingUser)
	if existingUser.ID != 0 {
		return nil
	}
	pass, err := pkg.PasswordHash(user.Password)
	if err != nil {
		return err
	}

	user.Password = string(pass)
	db.Create(&user)

	return nil
}

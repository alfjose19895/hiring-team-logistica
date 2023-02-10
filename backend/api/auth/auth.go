package auth

import (
	"com.funiber.org/database"
	"com.funiber.org/pkg"
	"errors"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"net/mail"
)

type LoginRequest struct {
	Identity string `json:"identity"`
	Password string `json:"password"`
}

type LoginResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// This function get the user by email and return the Account struct
func getUserByEmail(email string) (*Account, error) {
	db := database.DB
	var user Account
	if err := db.Where(&Account{Email: email}).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, pkg.EntityNotFound("Could not find valid identity")
		}
		return nil, pkg.UnexpectedError(err.Error())
	}
	return &user, nil
}

// This function get the email by username and return the Account struct
func getEmailByUser(username string) (*Account, error) {
	db := database.DB
	var user Account
	if err := db.Where(&Account{Username: username}).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, pkg.EntityNotFound("Could not find valid identity")
		}
		return nil, pkg.UnexpectedError(err.Error())
	}
	return &user, nil
}

// This function check if the email is valid based on the RFC 5322
func valid(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

// Login to the system
func Login(ctx *fiber.Ctx) error {
	input := new(LoginRequest)
	var userData LoginResponse

	if err := ctx.BodyParser(&input); err != nil {
		return pkg.BadRequest("Error while parsing body:" + err.Error())
	}

	identity := input.Identity
	password := input.Password

	user, email, err := new(Account), new(Account), *new(error)

	if valid(identity) {
		email, err = getUserByEmail(identity)
	} else {
		user, err = getEmailByUser(identity)
	}

	if err != nil {
		return pkg.BadRequest("Could not find valid identity:" + err.Error())
	}

	if email == nil && user == nil {
		return pkg.BadRequest("Could not find valid identity")
	}

	if email != nil {
		userData.ID = email.ID
		userData.Username = email.Username
		userData.Email = email.Email
		userData.Password = email.Password
	} else {
		userData.ID = user.ID
		userData.Username = user.Username
		userData.Email = user.Email
		userData.Password = user.Password
	}

	if !pkg.PasswordMatch(userData.Password, password) {
		return pkg.Unauthorized("Invalid password")
	}

	return ctx.JSON(userData)
}

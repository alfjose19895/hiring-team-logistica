package auth

import (
	"com.funiber.org/database"
	"com.funiber.org/pkg"
	"errors"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"time"
)

type LoginRequest struct {
	Identity string `json:"credential"`
	Password string `json:"password"`
}

type LoginResponse struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	LastLogin time.Time `json:"last_login"`
}

func Login(ctx *fiber.Ctx) error {
	db := database.DB
	input := new(LoginRequest)
	// generate time for last login
	lastLogin, _ := time.Parse("02/01/2006 15:04:05", time.Now().Format("02/01/2006 15:04:05"))

	if err := ctx.BodyParser(&input); err != nil {
		return pkg.BadRequest("Error while parsing body:" + err.Error())
	}

	identity := input.Identity
	password := input.Password

	var user Account
	if err := db.Where("username = ?", identity).Or("email = ?", identity).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return pkg.EntityNotFound("Could not find valid identity")
		}
		return pkg.UnexpectedError(err.Error())
	}

	if !pkg.PasswordMatch(password, user.Password) {
		return pkg.Unauthorized("Invalid password")
	}

	preLastLogin := user.LastLogin

	// Update the last login field
	db.Model(&user).Update("last_login", lastLogin)

	user.LastLogin = preLastLogin // we will return the prev last login to make more sense :)

	return ctx.Status(fiber.StatusOK).JSON(user)

}

func GetAccount(ctx *fiber.Ctx) error {
	var user Account
	db := database.DB
	id := ctx.Params("id")

	if err := db.Where("id = ?", id).Find(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return pkg.EntityNotFound("Could not find valid identity")
		}
		return pkg.UnexpectedError(err.Error())
	}
	return ctx.Status(fiber.StatusOK).JSON(user)
}

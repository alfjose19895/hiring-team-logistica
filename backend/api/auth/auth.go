package auth

import (
	"com.funiber.org/api/activity"
	"com.funiber.org/database"
	"com.funiber.org/models"
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
	ID        uint       `json:"id"`
	Username  string     `json:"username"`
	Email     string     `json:"email"`
	Password  string     `json:"password"`
	LastLogin *time.Time `json:"last_login"`
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

	var user models.Account
	// check if the identity exists in the database
	if err := db.Where("username = ? OR email = ?", identity, identity).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return pkg.Unauthorized("The credentials are invalid: " + err.Error())
		}
		return pkg.UnexpectedError("Error while querying the database:" + err.Error())
	}

	if !pkg.PasswordMatch(password, user.Password) {
		reason := "Invalid password"
		activity.PushLoginActivity(&user, ctx.IP(), &reason)                            // login logs only
		activity.PushActivity(&user, "Failed login attempt: "+reason, "AUTH", ctx.IP()) // push to global logs
		return pkg.Unauthorized(reason)
	}

	activity.PushLoginActivity(&user, ctx.IP(), nil)                                  // login logs only
	activity.PushActivity(&user, "User was successfully logged in", "AUTH", ctx.IP()) //  push to global logs

	// get the last login from the database to return it
	prevLogin := user.LastLogin

	// update the last login that we generated
	defer db.Model(&user).Update("last_login", &lastLogin)

	// return the previous login
	return ctx.Status(fiber.StatusOK).JSON(LoginResponse{
		ID:        user.ID,
		Username:  user.Username,
		Email:     user.Email,
		Password:  user.Password,
		LastLogin: prevLogin,
	})
}

func GetAccount(ctx *fiber.Ctx) error {
	var user models.Account
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

package pkg

type Error struct {
	Status  int    `json:"status"`
	Code    string `json:"code"`
	Message string `json:"message"`
}

func (e *Error) Error() string {
	return e.Message
}

func EntityNotFound(m string) *Error {
	return &Error{
		Status:  404,
		Code:    "ENTITY_NOT_FOUND",
		Message: m,
	}
}

func BadRequest(m string) *Error {
	return &Error{
		Status:  400,
		Code:    "BAD_REQUEST",
		Message: m,
	}
}

func Unauthorized(m string) *Error {
	return &Error{
		Status:  401,
		Code:    "UNAUTHORIZED",
		Message: m,
	}
}

func UnexpectedError(m string) *Error {
	return &Error{
		Status:  500,
		Code:    "INTERNAL_SERVER",
		Message: m,
	}
}

func Forbidden(m string) *Error {
	return &Error{
		Status:  403,
		Code:    "FORBIDDEN",
		Message: m,
	}
}

func RegistryExists(m string) *Error {
	return &Error{
		Status:  409,
		Code:    "REGISTRY_EXISTS",
		Message: m,
	}
}

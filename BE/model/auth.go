package entitymodel

import "errors"

type Login struct {
	Username string `json:"username" form:"username"`
	Password string `json:"password" form:"password"`
}

var (
	ErrWrongUsernameOrPassword = errors.New("Wrong username or password")
	ErrJWTCreationFailed       = errors.New("JWT creation failed")
)

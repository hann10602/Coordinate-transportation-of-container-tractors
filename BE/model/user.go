package model

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
)

type TUser struct {
	common.SQLModel
	FullName    string `json:"full_name" gorm:"column:full_name;size:255;not null"`
	Username    string `json:"username" gorm:"column:username;size:255;not null;unique;check:char_length(username) >= 6"`
	Password    string `json:"password" gorm:"column:password;size:255;not null;check:char_length(password) >= 6"`
	PhoneNumber string `json:"phone_number" gorm:"column:phone_number;size:50;not null;unique"`
	// RoleId int `json:"role" gorm:"column:role"`
	// Role TRole
}

type TRole struct {
}

var (
	ErrFullNameIsEmpty = errors.New("Full name cannot be empty")
	ErrUsernameIsEmpty = errors.New("Username cannot be empty")
	ErrPasswordIsEmpty = errors.New("Password cannot be empty")
	ErrUserDeleted     = errors.New("User is deleted")
	ErrUserDeletedNew  = common.NewCustomError(errors.New("User is deleted"), "User is deleted", "ErrUserDeleted")
)

func (TUser) TableName() string {
	return "user"
}

type TUserCreated struct {
	Id          int64      `json:"id" gorm:"column:id"`
	FullName    string     `json:"full_name" gorm:"column:full_name"`
	Username    string     `json:"username" gorm:"column:username"`
	Password    string     `json:"password" gorm:"column:password"`
	PhoneNumber string     `json:"phone_number" gorm:"column:phone_number"`
	CreatedAt   *time.Time `json:"created_at" gorm:"column:created_at"`
}

func (TUserCreated) TableName() string {
	return TUser{}.TableName()
}

type TUserUpdated struct {
	Id          int64      `json:"id" gorm:"column:id"`
	FullName    string     `json:"full_name" gorm:"column:full_name"`
	Username    string     `json:"username" gorm:"column:username"`
	Password    string     `json:"password" gorm:"column:password"`
	PhoneNumber string     `json:"phone_number" gorm:"column:phone_number"`
	UpdatedAt   *time.Time `json:"updated_at" gorm:"column:updated_at"`
}

func (TUserUpdated) TableName() string {
	return TUser{}.TableName()
}

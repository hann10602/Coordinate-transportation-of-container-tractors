package modeluser

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
)

type User struct {
	common.SQLModel
	FullName    string             `json:"fullName" gorm:"column:full_name;size:255;not null"`
	Username    string             `json:"username" gorm:"column:username;size:255;not null;unique;check:char_length(username) >= 6"`
	Password    string             `json:"password" gorm:"column:password;size:255;not null;check:char_length(password) >= 6"`
	PhoneNumber string             `json:"phoneNumber" gorm:"column:phone_number;size:50;not null;unique"`
	Status      string             `json:"status" gorm:"column:status;size:10;not null"`
	Role        string             `json:"role" gorm:"column:role;size:10;not null"`
	Orders      []modelorder.Order `json:"orders" gorm:"foreignKey:UserId"`
}

type TRole struct {
}

const (
	ACTIVE  = "Active"
	DELETED = "Deleted"
)

const (
	USER  = "User"
	ADMIN = "Admin"
)

var (
	ErrFullNameIsEmpty = errors.New("Full name cannot be empty")
	ErrUsernameIsEmpty = errors.New("Username cannot be empty")
	ErrPasswordIsEmpty = errors.New("Password cannot be empty")
	ErrUserDeleted     = errors.New("User is deleted")
	ErrUserDeletedNew  = common.NewCustomError(errors.New("User is deleted"), "User is deleted", "ErrUserDeleted")
)

func (User) TableName() string {
	return "user"
}

type UserCreated struct {
	Id          int64      `json:"id" gorm:"column:id"`
	FullName    string     `json:"fullName" gorm:"column:full_name"`
	Username    string     `json:"username" gorm:"column:username"`
	Password    string     `json:"password" gorm:"column:password"`
	Role        string     `json:"role" gorm:"column:role"`
	PhoneNumber string     `json:"phoneNumber" gorm:"column:phone_number"`
	Status      string     `json:"status" gorm:"column:status"`
	CreatedAt   *time.Time `json:"createdAt" gorm:"column:created_at"`
}

func (UserCreated) TableName() string {
	return User{}.TableName()
}

type UserUpdated struct {
	Id          int64      `json:"id" gorm:"column:id"`
	FullName    string     `json:"fullName" gorm:"column:full_name"`
	Username    string     `json:"username" gorm:"column:username"`
	Password    string     `json:"password" gorm:"column:password"`
	PhoneNumber string     `json:"phoneNumber" gorm:"column:phone_number"`
	UpdatedAt   *time.Time `json:"updatedAt" gorm:"column:updated_at"`
}

func (UserUpdated) TableName() string {
	return User{}.TableName()
}

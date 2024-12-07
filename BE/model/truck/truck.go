package modeldump

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
)

type Truck struct {
	common.SQLModel
	Title       string `json:"title" gorm:"column:title;size:255;not null"`
	NumberPlate string `json:"numberPlate" gorm:"column:number_plate;size:255;not null"`
	Status      string `json:"status" gorm:"column:status"`
	Orders      []modelorder.Order
}

func (Truck) TableName() string {
	return "truck"
}

const (
	ACTIVE      = "Active"
	MAINTENANCE = "Maintenance"
)

var (
	ErrTitleIsEmpty = errors.New("Title cannot be empty")
)

type TruckGetList struct {
	Id    int64  `json:"id" gorm:"column:id"`
	Title string `json:"title" gorm:"column:title"`
}

type Filter struct {
	Status string `json:"status" form:"status"`
}

type TruckCreated struct {
	Id        int64      `json:"id" gorm:"column:id"`
	Title     string     `json:"title" gorm:"column:title"`
	CreatedAt *time.Time `json:"createdAt" gorm:"column:created_at"`
	Status    string     `json:"status" gorm:"column:status"`
}

func (TruckCreated) TableName() string {
	return Truck{}.TableName()
}

type TruckUpdated struct {
	Id        int64      `json:"id" gorm:"column:id"`
	Title     string     `json:"title" gorm:"column:title"`
	UpdatedAt *time.Time `json:"updatedAt" gorm:"column:updated_at"`
}

func (TruckUpdated) TableName() string {
	return Truck{}.TableName()
}

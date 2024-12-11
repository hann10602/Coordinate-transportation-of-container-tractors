package modeltruck

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
)

type Truck struct {
	common.SQLModel
	Title       string             `json:"title" gorm:"column:title;size:255;not null;unique"`
	NumberPlate string             `json:"numberPlate" gorm:"column:number_plate;size:255;not null;unique"`
	Status      string             `json:"status" gorm:"column:status"`
	PortDump    []modelorder.Order `gorm:"foreignKey:TruckId"`
}

func (Truck) TableName() string {
	return "truck"
}

const (
	ACTIVE      = "Active"
	MAINTENANCE = "Maintenance"
	DELETED     = "Deleted"
)

var (
	ErrTitleIsEmpty = errors.New("Title cannot be empty")
)

type TruckGetList struct {
	common.SQLModel
	Title       string `json:"title" gorm:"column:title"`
	NumberPlate string `json:"numberPlate" gorm:"column:number_plate"`
	Status      string `json:"status" gorm:"column:status"`
}

type Filter struct {
	Status string `json:"status" form:"status"`
}

type TruckCreated struct {
	Id          int64      `json:"id" gorm:"column:id"`
	Title       string     `json:"title" gorm:"column:title"`
	NumberPlate string     `json:"numberPlate" gorm:"column:number_plate"`
	Status      string     `json:"status" gorm:"column:status"`
	CreatedAt   *time.Time `json:"createdAt" gorm:"column:created_at"`
}

func (TruckCreated) TableName() string {
	return Truck{}.TableName()
}

type TruckUpdated struct {
	Id          int64      `json:"id" gorm:"column:id"`
	Title       string     `json:"title" gorm:"column:title"`
	NumberPlate string     `json:"numberPlate" gorm:"column:number_plate"`
	Status      string     `json:"status" gorm:"column:status"`
	UpdatedAt   *time.Time `json:"updatedAt" gorm:"column:updated_at"`
}

func (TruckUpdated) TableName() string {
	return Truck{}.TableName()
}

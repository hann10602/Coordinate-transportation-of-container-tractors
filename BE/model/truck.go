package entitymodel

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
)

type Truck struct {
	common.SQLModel
	Title       string  `json:"title" gorm:"column:title;size:255;not null;unique"`
	DriverName  string  `json:"driverName" gorm:"column:driver_name;size:255;not null"`
	PhoneNumber string  `json:"phoneNumber" gorm:"column:phone_number;size:50;not null;unique"`
	NumberPlate string  `json:"numberPlate" gorm:"column:number_plate;size:255;not null;unique"`
	Status      string  `json:"status" gorm:"column:status;size:10;not null"`
	PortDump    []Order `gorm:"foreignKey:TruckId"`
}

func (Truck) TableName() string {
	return "truck"
}

const (
	MAINTENANCE = "Maintenance"
)

var (
	ErrTitleIsEmpty = errors.New("Title cannot be empty")
)

type TruckGetList struct {
	common.SQLModel
	Title       string `json:"title" gorm:"column:title"`
	DriverName  string `json:"driverName" gorm:"column:driver_name"`
	PhoneNumber string `json:"phoneNumber" gorm:"column:phone_number"`
	NumberPlate string `json:"numberPlate" gorm:"column:number_plate"`
	Status      string `json:"status" gorm:"column:status"`
}

type TruckId struct {
	Id int64 `json:"id" gorm:"column:id"`
}

type TruckCreated struct {
	Id          int64      `json:"id" gorm:"column:id"`
	Title       string     `json:"title" gorm:"column:title"`
	DriverName  string     `json:"driverName" gorm:"column:driver_name"`
	PhoneNumber string     `json:"phoneNumber" gorm:"column:phone_number"`
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
	DriverName  string     `json:"driverName" gorm:"column:driver_name"`
	PhoneNumber string     `json:"phoneNumber" gorm:"column:phone_number"`
	NumberPlate string     `json:"numberPlate" gorm:"column:number_plate"`
	Status      string     `json:"status" gorm:"column:status"`
	UpdatedAt   *time.Time `json:"updatedAt" gorm:"column:updated_at"`
}

func (TruckUpdated) TableName() string {
	return Truck{}.TableName()
}

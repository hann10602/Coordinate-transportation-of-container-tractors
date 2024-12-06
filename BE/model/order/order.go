package modelorder

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/shopspring/decimal"
)

type Order struct {
	common.SQLModel
	Title      string `json:"title" gorm:"column:title;size:255;not null"`
	TotalPrice int32  `json:"total_price" gorm:"column:total_price;size:10;not null"`
	Status     string `json:"status" gorm:"column:status"`
	Type       string `json:"type" gorm:"column:type"`
	TruckID    int64  `json:"truck_id" gorm:"column:truck_id"`
}

// type OrderType struct {
// 	common.SQLModel
// 	Name  string `json:"name" gorm:"column:name;size:255;not null"`
// 	Code  string `json:"code" gorm:"column:code;size:255;not null"`
// 	Orders []Order
// }

func (Order) TableName() string {
	return "order"
}

const (
	ONGOING = "Ongoing"
	PENDING = "Pending"
	WAIT    = "Wait"
)

const (
	IE = "Ie"
	IF = "If"
	OE = "Oe"
	OF = "Of"
)

var (
	ErrTitleIsEmpty = errors.New("Title cannot be empty")
)

type OrderGetList struct {
	Id        int64   `json:"id" gorm:"column:id"`
	Title     string  `json:"title" gorm:"column:title"`
	Latitude  float64 `json:"latitude" gorm:"column:latitude"`
	Longitude float64 `json:"longitude" gorm:"column:longitude"`
}

type Filter struct {
	Type   string `json:"type" form:"type"`
	Status string `json:"status" form:"status"`
}

type OrderCreated struct {
	Id        int64           `json:"id" gorm:"column:id"`
	Title     string          `json:"title" gorm:"column:title"`
	Latitude  decimal.Decimal `json:"latitude" gorm:"column:latitude"`
	Longitude decimal.Decimal `json:"longitude" gorm:"column:longitude"`
	CreatedAt *time.Time      `json:"created_at" gorm:"column:created_at"`
	Status    string          `json:"status" gorm:"column:status"`
	Type      string          `json:"type" gorm:"column:type"`
}

func (OrderCreated) TableName() string {
	return Order{}.TableName()
}

type OrderUpdated struct {
	Id        int64           `json:"id" gorm:"column:id"`
	Title     string          `json:"title" gorm:"column:title"`
	Latitude  decimal.Decimal `json:"latitude" gorm:"column:latitude"`
	Longitude decimal.Decimal `json:"longitude" gorm:"column:longitude"`
	UpdatedAt *time.Time      `json:"updated_at" gorm:"column:updated_at"`
}

func (OrderUpdated) TableName() string {
	return Order{}.TableName()
}

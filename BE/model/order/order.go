package modelorder

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/shopspring/decimal"
)

type Order struct {
	common.SQLModel
	Title          string     `json:"title" gorm:"column:title;size:255;not null"`
	TotalPrice     int32      `json:"totalPrice" gorm:"column:total_price;size:10;not null"`
	DeliveryDate   *time.Time `json:"deliveryDate" gorm:"column:delivery_date"`
	Latitude       float64    `json:"latitude" gorm:"column:latitude"`
	Longitude      float64    `json:"longitude" gorm:"column:longitude"`
	Status         string     `json:"status" gorm:"column:status;size:10;not null"`
	Type           string     `json:"type" gorm:"column:type;size:10;not null"`
	TruckID        int64      `json:"truckId" gorm:"column:truck_id"`
	PortId         int64      `json:"portId" gorm:"column:port_id"`
	StartTrailerId int64      `json:"startTrailerId" gorm:"column:start_trailer_id"`
	EndTrailerId   int64      `json:"endTrailerId" gorm:"column:end_trailer_id"`
	ContainerId    int64      `json:"containerId" gorm:"column:container_id"`
}

func (Order) TableName() string {
	return "order"
}

const (
	DONE    = "Done"
	DELETED = "Deleted"
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
	Id             int64      `json:"id" gorm:"column:id"`
	Title          string     `json:"title" gorm:"column:title"`
	TotalPrice     int32      `json:"totalPrice" gorm:"column:total_price"`
	DeliveryDate   *time.Time `json:"deliveryDate" gorm:"column:delivery_date"`
	Latitude       float64    `json:"latitude" gorm:"column:latitude"`
	Longitude      float64    `json:"longitude" gorm:"column:longitude"`
	Status         string     `json:"status" gorm:"column:status"`
	Type           string     `json:"type" gorm:"column:type"`
	TruckID        int64      `json:"truckId" gorm:"column:truck_id"`
	PortId         int64      `json:"portId" gorm:"column:port_id"`
	StartTrailerId int64      `json:"startTrailerId" gorm:"column:start_trailer_id"`
	EndTrailerId   int64      `json:"endTrailerId" gorm:"column:end_trailer_id"`
	ContainerId    int64      `json:"containerId" gorm:"column:container_id"`
	CreatedAt      *time.Time `json:"createdAt" gorm:"column:created_at"`
}

type Filter struct {
	Type   string `json:"type" form:"type"`
	Status string `json:"status" form:"status"`
}

type OrderCreated struct {
	Id             int64           `json:"id" gorm:"column:id"`
	Title          string          `json:"title" gorm:"column:title"`
	TotalPrice     int32           `json:"totalPrice" gorm:"column:total_price"`
	DeliveryDate   *time.Time      `json:"deliveryDate" gorm:"column:delivery_date"`
	Latitude       decimal.Decimal `json:"latitude" gorm:"column:latitude"`
	Longitude      decimal.Decimal `json:"longitude" gorm:"column:longitude"`
	CreatedAt      *time.Time      `json:"createdAt" gorm:"column:created_at"`
	Status         string          `json:"status" gorm:"column:status"`
	Type           string          `json:"type" gorm:"column:type"`
	PortId         int64           `json:"portId" gorm:"column:port_id"`
	StartTrailerId int64           `json:"startTrailerId" gorm:"column:start_trailer_id"`
	EndTrailerId   int64           `json:"endTrailerId" gorm:"column:end_trailer_id"`
	ContainerId    int64           `json:"containerId" gorm:"column:container_id"`
}

type OrderCreatedInput struct {
	Title          string            `json:"title"`
	TotalPrice     int32             `json:"totalPrice"`
	DeliveryDate   common.CustomDate `json:"deliveryDate"`
	Latitude       decimal.Decimal   `json:"latitude"`
	Longitude      decimal.Decimal   `json:"longitude"`
	Type           string            `json:"type"`
	PortId         int64             `json:"portId"`
	StartTrailerId int64             `json:"startTrailerId"`
	EndTrailerId   int64             `json:"endTrailerId"`
	ContainerId    int64             `json:"containerId"`
}

func (OrderCreated) TableName() string {
	return Order{}.TableName()
}

type OrderUpdated struct {
	Id           int64           `json:"id" gorm:"column:id"`
	Title        string          `json:"title" gorm:"column:title"`
	TotalPrice   int32           `json:"totalPrice" gorm:"column:total_price"`
	DeliveryDate *time.Time      `json:"deliveryDate" gorm:"column:delivery_date"`
	Latitude     decimal.Decimal `json:"latitude" gorm:"column:latitude"`
	Longitude    decimal.Decimal `json:"longitude" gorm:"column:longitude"`
	Status       string          `json:"status" gorm:"column:status"`
	Type         string          `json:"type" gorm:"column:type"`
	TruckID      int64           `json:"truckId" gorm:"column:truck_id"`
	PortId       int64           `json:"portId" gorm:"column:port_id"`
	ContainerId  int64           `json:"containerId" gorm:"column:container_id"`
	UpdatedAt    *time.Time      `json:"updatedAt" gorm:"column:updated_at"`
}

func (OrderUpdated) TableName() string {
	return Order{}.TableName()
}

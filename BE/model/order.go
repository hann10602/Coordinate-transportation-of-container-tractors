package entitymodel

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
)

type Order struct {
	common.SQLModel
	TotalPrice          int64      `json:"totalPrice" gorm:"column:total_price;not null"`
	DeliveryDate        *time.Time `json:"deliveryDate" gorm:"column:delivery_date"`
	CurrentPosition     int8       `json:"currentPosition" gorm:"column:current_position;not null"`
	DetailAddress       string     `json:"detailAddress" gorm:"column:detail_address;size:255;not null"`
	Note                string     `json:"note" gorm:"column:note;size:255;not null"`
	Status              string     `json:"status" gorm:"column:status;size:10;not null"`
	Type                string     `json:"type" gorm:"column:type;size:10;not null"`
	TruckId             int64      `json:"truckId" gorm:"column:truck_id"`
	UserId              int64      `json:"userId" gorm:"column:user_id"`
	PortId              int64      `json:"portId" gorm:"column:port_id"`
	Port                Dump       `json:"port" gorm:"foreignKey:PortId"`
	CustomerWarehouseId int64      `json:"customerWarehouseId" gorm:"column:customer_warehouse_id"`
	CustomerWarehouse   Dump       `json:"customerWarehouse" gorm:"foreignKey:CustomerWarehouseId"`
	StartTrailerId      int64      `json:"startTrailerId" gorm:"column:start_trailer_id"`
	StartTrailer        Dump       `json:"startTrailer" gorm:"foreignKey:StartTrailerId"`
	EndTrailerId        int64      `json:"endTrailerId" gorm:"column:end_trailer_id"`
	EndTrailer          Dump       `json:"endTrailer" gorm:"foreignKey:EndTrailerId"`
	ContainerId         int64      `json:"containerId" gorm:"column:container_id"`
	Container           Dump       `json:"container" gorm:"foreignKey:ContainerId"`
}

func (Order) TableName() string {
	return "order"
}

// status
const (
	DONE    = "Done"
	ONGOING = "Ongoing"
	PENDING = "Pending"
	WAIT    = "Wait"
)

// type
const (
	IE = "IE"
	IF = "IF"
	OE = "OE"
	OF = "OF"
)

// current position
const (
	CUSTOMER      = "Customer"
	START_TRAILER = "Start-trailer"
	END_TRAILER   = "End-trailer"
)

var (
	ErrDetailAddressIsEmpty = errors.New("Detail address cannot be empty")
	ErrNoteIsEmpty          = errors.New("Note cannot be empty")
)

type OrderGetList struct {
	common.SQLModel
	TotalPrice          int32      `json:"totalPrice" gorm:"column:total_price"`
	DeliveryDate        *time.Time `json:"deliveryDate" gorm:"column:delivery_date"`
	CurrentPosition     int8       `json:"currentPosition" gorm:"column:current_position"`
	DetailAddress       string     `json:"detailAddress" gorm:"column:detail_address"`
	Note                string     `json:"note" gorm:"column:note"`
	Status              string     `json:"status" gorm:"column:status"`
	Type                string     `json:"type" gorm:"column:type"`
	TruckId             int64      `json:"truckId" gorm:"column:truck_id"`
	UserId              int64      `json:"userId" gorm:"column:user_id"`
	PortId              int64      `json:"portId" gorm:"column:port_id"`
	CustomerWarehouseId int64      `json:"customerWarehouseId" gorm:"column:customer_warehouse_id"`
	StartTrailerId      int64      `json:"startTrailerId" gorm:"column:start_trailer_id"`
	EndTrailerId        int64      `json:"endTrailerId" gorm:"column:end_trailer_id"`
	ContainerId         int64      `json:"containerId" gorm:"column:container_id"`
}

type Filter struct {
	Type   string `json:"type" form:"type"`
	Status string `json:"status" form:"status"`
}

type OrderCreated struct {
	Id                  int64      `json:"id" gorm:"column:id"`
	CreatedAt           *time.Time `json:"createdAt" gorm:"column:created_at"`
	TotalPrice          int32      `json:"totalPrice" gorm:"column:total_price"`
	DeliveryDate        *time.Time `json:"deliveryDate" gorm:"column:delivery_date"`
	CurrentPosition     int8       `json:"currentPosition" gorm:"column:current_position"`
	DetailAddress       string     `json:"detailAddress" gorm:"column:detail_address"`
	Note                string     `json:"note" gorm:"column:note"`
	Status              string     `json:"status" gorm:"column:status"`
	Type                string     `json:"type" gorm:"column:type"`
	TruckId             *int64     `json:"truckId" gorm:"column:truck_id"`
	UserId              int64      `json:"userId" gorm:"column:user_id"`
	PortId              *int64     `json:"portId" gorm:"column:port_id"`
	CustomerWarehouseId int64      `json:"customerWarehouseId" gorm:"column:customer_warehouse_id"`
	StartTrailerId      int64      `json:"startTrailerId" gorm:"column:start_trailer_id"`
	EndTrailerId        int64      `json:"endTrailerId" gorm:"column:end_trailer_id"`
	ContainerId         *int64     `json:"containerId" gorm:"column:container_id"`
}

type OrderCreatedInput struct {
	TotalPrice          int32             `json:"totalPrice" gorm:"column:total_price"`
	DeliveryDate        common.CustomDate `json:"deliveryDate" gorm:"column:delivery_date"`
	CurrentPosition     int8              `json:"currentPosition" gorm:"column:current_position"`
	DetailAddress       string            `json:"detailAddress" gorm:"column:detail_address"`
	Note                string            `json:"note" gorm:"column:note"`
	Type                string            `json:"type" gorm:"column:type"`
	TruckId             int64             `json:"truckId" gorm:"column:truck_id"`
	UserId              int64             `json:"userId" gorm:"column:user_id"`
	PortId              int64             `json:"portId" gorm:"column:port_id"`
	CustomerWarehouseId int64             `json:"customerWarehouseId" gorm:"column:customer_warehouse_id"`
	StartTrailerId      int64             `json:"startTrailerId" gorm:"column:start_trailer_id"`
	EndTrailerId        int64             `json:"endTrailerId" gorm:"column:end_trailer_id"`
	ContainerId         int64             `json:"containerId" gorm:"column:container_id"`
}

func (OrderCreated) TableName() string {
	return Order{}.TableName()
}

type OrderUpdated struct {
	CurrentPosition int8       `json:"currentPosition" gorm:"column:current_position"`
	Status          string     `json:"status" gorm:"column:status"`
	UpdatedAt       *time.Time `json:"updatedAt" gorm:"column:updated_at"`
}

type OrderUpdatedNextStep struct {
	CurrentPosition int8       `json:"currentPosition" gorm:"column:current_position"`
	UpdatedAt       *time.Time `json:"updatedAt" gorm:"column:updated_at"`
}

func (OrderUpdated) TableName() string {
	return Order{}.TableName()
}

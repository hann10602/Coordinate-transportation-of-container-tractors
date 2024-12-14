package modeldump

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
	"github.com/shopspring/decimal"
)

type Dump struct {
	common.SQLModel
	Title            string             `json:"title" gorm:"column:title;size:255;not null"`
	Latitude         decimal.Decimal    `json:"latitude" gorm:"column:latitude;type:DECIMAL(19,17);not null"`
	Longitude        decimal.Decimal    `json:"longitude" gorm:"column:longitude;type:DECIMAL(20,17);not null"`
	Status           string             `json:"status" gorm:"column:status;size:10;not null"`
	Type             string             `json:"type" gorm:"column:type;size:10;not null"`
	PortDump         []modelorder.Order `gorm:"foreignKey:PortId"`
	StartTrailerDump []modelorder.Order `gorm:"foreignKey:StartTrailerId"`
	EndTrailerDump   []modelorder.Order `gorm:"foreignKey:EndTrailerId"`
	ContainerDump    []modelorder.Order `gorm:"foreignKey:ContainerId"`
}

func (Dump) TableName() string {
	return "dump"
}

const (
	WORKING = "Working"
	CLOSED  = "Closed"
)

const (
	PORT      = "Port"
	CONTAINER = "Container"
	TRAILER   = "Trailer"
)

var (
	ErrTitleIsEmpty          = errors.New("Title cannot be empty")
	ErrValueExceedsPrecision = errors.New("Value exceeds total precision")
	ErrValueExceedsScale     = errors.New("Value exceeds scale")
	ErrInvalidLatitude       = errors.New("Latitude cannot be empty")
	ErrInvalidLongitude      = errors.New("Longitude cannot be empty")
)

type DumpGetNearestTrailer struct {
	Latitude  float64 `json:"latitude" form:"latitude"`
	Longitude float64 `json:"longitude" form:"longitude"`
}

type DumpGetList struct {
	common.SQLModel
	Title     string  `json:"title" gorm:"column:title"`
	Latitude  float64 `json:"latitude" gorm:"column:latitude"`
	Longitude float64 `json:"longitude" gorm:"column:longitude"`
	Status    string  `json:"status" gorm:"column:status"`
}

type Filter struct {
	Type   string `json:"type" form:"type"`
	Status string `json:"status" form:"status"`
}

type DumpCreated struct {
	Id        int64           `json:"id" gorm:"column:id"`
	Title     string          `json:"title" gorm:"column:title"`
	Latitude  decimal.Decimal `json:"latitude" gorm:"column:latitude"`
	Longitude decimal.Decimal `json:"longitude" gorm:"column:longitude"`
	CreatedAt *time.Time      `json:"createdAt" gorm:"column:created_at"`
	Status    string          `json:"status" gorm:"column:status"`
	Type      string          `json:"type" gorm:"column:type"`
}

func (DumpCreated) TableName() string {
	return Dump{}.TableName()
}

type DumpUpdated struct {
	Id        int64           `json:"id" gorm:"column:id"`
	Title     string          `json:"title" gorm:"column:title"`
	Latitude  decimal.Decimal `json:"latitude" gorm:"column:latitude"`
	Longitude decimal.Decimal `json:"longitude" gorm:"column:longitude"`
	UpdatedAt *time.Time      `json:"updatedAt" gorm:"column:updated_at"`
}

func (DumpUpdated) TableName() string {
	return Dump{}.TableName()
}

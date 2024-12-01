package modeldump

import (
	"errors"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/shopspring/decimal"
)

type Dump struct {
	common.SQLModel
	Title     string          `json:"title" gorm:"column:title;size:255;not null"`
	Latitude  decimal.Decimal `json:"latitude" gorm:"column:latitude;type:DECIMAL(19,17);not null"`
	Longitude decimal.Decimal `json:"longitude" gorm:"column:longitude;type:DECIMAL(20,17);not null"`
	Status    string          `json:"status" gorm:"column:status"`
	Type      string          `json:"type" gorm:"column:type"`
	// DumpTypeID int64           `json:"dump_type_id" gorm:"column:dump_type_id"`
}

// type DumpType struct {
// 	common.SQLModel
// 	Name  string `json:"name" gorm:"column:name;size:255;not null"`
// 	Code  string `json:"code" gorm:"column:code;size:255;not null"`
// 	Dumps []Dump
// }

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

type DumpGetList struct {
	Id        int64   `json:"id" gorm:"column:id"`
	Title     string  `json:"title" gorm:"column:title"`
	Latitude  float64 `json:"latitude" gorm:"column:latitude"`
	Longitude float64 `json:"longitude" gorm:"column:longitude"`
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
	CreatedAt *time.Time      `json:"created_at" gorm:"column:created_at"`
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
	UpdatedAt *time.Time      `json:"updated_at" gorm:"column:updated_at"`
}

func (DumpUpdated) TableName() string {
	return Dump{}.TableName()
}

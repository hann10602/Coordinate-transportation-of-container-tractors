package entitymodel

import (
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
)

type Advisory struct {
	common.SQLModel
	FullName    string `json:"fullName" gorm:"column:full_name;not null"`
	Note        string `json:"note" gorm:"column:note;not null"`
	PhoneNumber string `json:"phoneNumber" gorm:"column:phone_number;not null"`
	Email       string `json:"email" gorm:"column:email;size:255;not null"`
}

func (Advisory) TableName() string {
	return "advisory"
}

type AdvisoryGetList struct {
	common.SQLModel
	FullName    string `json:"fullName" gorm:"column:full_name;not null"`
	Note        string `json:"note" gorm:"column:note;not null"`
	PhoneNumber string `json:"phoneNumber" gorm:"column:phone_number;not null"`
	Email       string `json:"email" gorm:"column:email;size:255;not null"`
}

type AdvisoryCreated struct {
	Id          int64      `json:"id" gorm:"column:id"`
	CreatedAt   *time.Time `json:"createdAt" gorm:"column:created_at"`
	FullName    string     `json:"fullName" gorm:"column:full_name;not null"`
	Note        string     `json:"note" gorm:"column:note;not null"`
	PhoneNumber string     `json:"phoneNumber" gorm:"column:phone_number;not null"`
	Email       string     `json:"email" gorm:"column:email;size:255;not null"`
}

package common

import "time"

type SQLModel struct {
	Id        int64      `json:"id" gorm:"column:id;primaryKey"`
	CreatedAt *time.Time `json:"createdAt" gorm:"column:created_at"`
	UpdatedAt *time.Time `json:"updatedAt" gorm:"column:updated_at"`
}

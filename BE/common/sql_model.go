package common

import "time"

type SQLModel struct {
	Id        int64      `json:"id" gorm:"column:id;primaryKey"`
	CreatedAt *time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime"`
	UpdatedAt *time.Time `json:"updated_at" gorm:"column:updated_at;autoUpdateTime"`
}

package model

import (
	"errors"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
)

type TodoItem struct {
	common.SQLModel
	Title       string      `json:"title" gorm:"column:title"`
	Description string      `json:"description" gorm:"column:description"`
	Status      *ItemStatus `json:"status" gorm:"column:status"`
}

var (
	ErrTitleIsBlank = errors.New("Title cannot be blank")
)

func (TodoItem) TableName() string {
	return "item"
}

type TodoItemCreated struct {
	Id          int         `json:"id" gorm:"column:id"`
	Title       string      `json:"title" gorm:"column:title"`
	Description string      `json:"description" gorm:"column:description"`
	Status      *ItemStatus `json:"status" gorm:"column:status"`
}

func (TodoItemCreated) TableName() string {
	return TodoItem{}.TableName()
}

type TodoItemUpdated struct {
	Id          int     `json:"id" gorm:"column:id"`
	Title       *string `json:"title" gorm:"column:title"`
	Description *string `json:"description" gorm:"column:description"`
	Status      *string `json:"status" gorm:"column:status"`
}

func (TodoItemUpdated) TableName() string {
	return TodoItem{}.TableName()
}
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type TodoItem struct {
	Id          int        `json:"id"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	Status      string     `json:"status,omitempty"`
	CreatedAt   *time.Time `json:"created_at"`
	UpdatedAt   *time.Time `json:"updated_at,omitempty"`
}

func main() {
	now := time.Now().UTC()

	item := TodoItem{
		Id:          1,
		Title:       "This is item 1",
		Description: "This is item 1",
		Status:      "This is item 1",
		CreatedAt:   &now,
		UpdatedAt:   nil,
	}

	jsonData, err := json.Marshal(item)

	if err != nil {
		fmt.Println(err)

		return
	}

	stringData := string(jsonData)

	fmt.Println(stringData)

	var item2 TodoItem

	if err := json.Unmarshal([]byte(stringData), &item2); err != nil {
		fmt.Println(err)

		return
	}

	fmt.Println(item2.Status)

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"Message": "pong",
		})
	})

	r.Run()
}

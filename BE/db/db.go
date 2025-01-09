package db

import (
	"context"
	"log"
	"time"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/storage"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func ScheduleDailyTask() {
    store := storage.NewSqlStore(db)

    ticker := time.NewTicker(24 * time.Hour)
    go func() {
        for {
            select {
            case <-ticker.C:
                err := store.UpdateExpiredOrders(context.Background())
                if err != nil {
                    log.Printf("Error updating expired orders: %v", err)
                } else {
                    log.Println("Successfully updated expired orders")
                }
            }
        }
    }()
}

func DbConnection() {
	dsn := "root:mny10602@tcp(localhost:3306)/gorm?charset=utf8mb4&parseTime=True"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database")
	}

	db = database
}

func DbMigrate() {
	db.AutoMigrate(&entitymodel.User{}, &entitymodel.Dump{}, &entitymodel.Truck{}, &entitymodel.Order{}, &entitymodel.Advisory{})
}

func DbManager() *gorm.DB {
	return db
}

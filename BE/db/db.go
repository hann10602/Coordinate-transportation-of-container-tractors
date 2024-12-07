package db

import (
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func DbConnection() {
	dsn := "root:mny10602@tcp(localhost:3306)/gorm?charset=utf8mb4&parseTime=True"
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database")
	}

	db = database
}

func DbMigrate() {
	db.AutoMigrate(&modeluser.User{}, &modeldump.Dump{}, &modelorder.Order{})
}

func DbManager() *gorm.DB {
	return db
}

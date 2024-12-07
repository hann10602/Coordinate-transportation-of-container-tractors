package main

import (
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/db"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/env"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/routes"
)

func main() {
	env.InitializeENV()
	db.DbConnection()
	db.DbMigrate()
	r := routes.Init()

	r.Run()
}

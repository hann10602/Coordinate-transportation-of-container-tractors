package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/db"
	ginuser "github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/user/transport/gin"
)

func Init() *gin.Engine {
	dbInstance := db.DbManager()

	r := gin.Default()

	v1 := r.Group("/v1")
	{
		user := v1.Group("/user")
		{
			user.GET("", ginuser.GetListUser(dbInstance))
			user.GET("/:id", ginuser.GetUser(dbInstance))
			user.POST("", ginuser.CreateUser(dbInstance))
			user.PUT("/:id", ginuser.UpdateUser(dbInstance))
			user.DELETE("/:id", ginuser.DeleteUser(dbInstance))
		}
	}

	return r
}

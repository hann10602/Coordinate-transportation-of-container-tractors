package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/db"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/middleware"
	gindump "github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/dump/transport/gin"
	ginorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/transport/gin"
	ginpayment "github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/payment/transport/gin"
	gintruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/truck/transport/gin"
	ginuser "github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/user/transport/gin"
)

func Init() *gin.Engine {
	dbInstance := db.DbManager()

	r := gin.Default()

	r.Use(middleware.CORSMiddleware())

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

		dump := v1.Group("/dump")
		{
			dump.GET("", gindump.GetListDump(dbInstance))
			dump.GET("/nearest-trailer", gindump.GetNearestTrailerDump(dbInstance))
			dump.GET("/:id", gindump.GetDump(dbInstance))
			dump.POST("", gindump.CreateDump(dbInstance))
			dump.PUT("/:id", gindump.UpdateDump(dbInstance))
			dump.DELETE("/:id", gindump.DeleteDump(dbInstance))
		}

		order := v1.Group("/order")
		{
			order.GET("", ginorder.GetListOrder(dbInstance))
			order.GET("/:id", ginorder.GetOrder(dbInstance))
			order.POST("", ginorder.CreateOrder(dbInstance))
			order.PUT("/:id", ginorder.UpdateOrder(dbInstance))
			order.DELETE("/:id", ginorder.DeleteOrder(dbInstance))
		}

		truck := v1.Group("/truck")
		{
			truck.GET("", gintruck.GetListTruck(dbInstance))
			truck.GET("/:id", gintruck.GetTruck(dbInstance))
			truck.POST("", gintruck.CreateTruck(dbInstance))
			truck.PUT("/:id", gintruck.UpdateTruck(dbInstance))
			truck.DELETE("/:id", gintruck.DeleteTruck(dbInstance))
		}

		payment := v1.Group("/payment")
		{
			payment.POST("create-payment-intent", ginpayment.CreatePaymentIntent())
			payment.POST("create-checkout-session", ginpayment.CreateCheckoutSession(dbInstance))
		}
	}

	return r
}

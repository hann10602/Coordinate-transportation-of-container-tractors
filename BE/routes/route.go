package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/db"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/middleware"
	ginauth "github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/auth/transport/gin"
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
		auth := v1.Group("/auth")
		{
			auth.GET("/login", ginauth.Login(dbInstance))
		}

		user := v1.Group("/user")
		{
			user.GET("", ginuser.GetListUser(dbInstance), middleware.JWTAuthMiddleware())
			user.GET("/:id", ginuser.GetUser(dbInstance), middleware.JWTAuthMiddleware())
			user.POST("", ginuser.CreateUser(dbInstance))
			user.PUT("/:id", ginuser.UpdateUser(dbInstance), middleware.JWTAuthMiddleware())
			user.DELETE("/:id", ginuser.DeleteUser(dbInstance), middleware.JWTAuthMiddleware())
		}

		dump := v1.Group("/dump", middleware.JWTAuthMiddleware())
		{
			dump.GET("", gindump.GetListDump(dbInstance), CORSMiddleware())
			dump.GET("/nearest-trailer", gindump.GetNearestTrailerDump(dbInstance))
			dump.GET("/:id", gindump.GetDump(dbInstance))
			dump.POST("", gindump.CreateDump(dbInstance))
			dump.POST("/customer-warehouse", gindump.CreateCustomerWarehouse(dbInstance))
			dump.PUT("/:id", gindump.UpdateDump(dbInstance))
			dump.DELETE("/:id", gindump.DeleteDump(dbInstance))
		}

		order := v1.Group("/order", middleware.JWTAuthMiddleware())
		{
			order.GET("", ginorder.GetListOrder(dbInstance))
			order.GET("/:id", ginorder.GetOrder(dbInstance))
			order.POST("", ginorder.CreateOrder(dbInstance))
			order.PUT("/:id", ginorder.UpdateOrder(dbInstance))
			order.PUT("/next-step/:id/:truck-id", ginorder.UpdateNextStepOrder(dbInstance))
			order.PUT("/automatic-delivery-assigned-order", ginorder.AutomaticDeliveryAssignedOrder(dbInstance))
			order.DELETE("/:id", ginorder.DeleteOrder(dbInstance))
		}

		truck := v1.Group("/truck", middleware.JWTAuthMiddleware())
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
			payment.POST("create-checkout-session", ginpayment.CreateCheckoutSession(dbInstance), middleware.JWTAuthMiddleware())
			payment.POST("webhook", ginpayment.HandleStripeWebhook(dbInstance), middleware.JWTAuthMiddleware())
		}
	}

	return r
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

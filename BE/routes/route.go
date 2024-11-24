package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/db"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/middleware"
	ginpayment "github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/payment/transport/gin"
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

		payment := v1.Group("/payment")
		{
			payment.POST("create-payment-intent", ginpayment.CreatePaymentIntent())
			payment.POST("create-checkout-session", ginpayment.CreateCheckoutSession(dbInstance))
		}
	}

	return r
}

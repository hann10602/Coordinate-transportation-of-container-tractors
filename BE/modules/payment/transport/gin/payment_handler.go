package ginpayment

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"github.com/stripe/stripe-go/v81"
	"github.com/stripe/stripe-go/v81/checkout/session"
	"github.com/stripe/stripe-go/v81/paymentintent"
	"gorm.io/gorm"
)

func CreatePaymentIntent() func(*gin.Context) {
	return func(c *gin.Context) {
		stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
		params := &stripe.PaymentIntentParams{
			Amount:   stripe.Int64(int64(2000)),
			Currency: stripe.String(string(stripe.CurrencyUSD)),
			AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
				Enabled: stripe.Bool(true),
			},
		}

		result, err := paymentintent.New(params)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(result))
	}
}

func CreateCheckoutSession(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paymentCheckout model.TPaymentCheckout

		if err := c.ShouldBind(&paymentCheckout); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}
		
		stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
		params := &stripe.CheckoutSessionParams{
			Mode: stripe.String(string(stripe.CheckoutSessionModePayment)),
			LineItems: []*stripe.CheckoutSessionLineItemParams{
				&stripe.CheckoutSessionLineItemParams{
					PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
						Currency: stripe.String("usd"),
						ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
							Name: stripe.String(paymentCheckout.DeliveryType),
						},
						UnitAmount: stripe.Int64(paymentCheckout.Price),
					},
					Quantity: stripe.Int64(1),
				},
			},
			SuccessURL: stripe.String("http://localhost:3000/payment-completed"),
			CancelURL:  stripe.String("http://localhost:3000/payment-failure"),
		}

		s, err := session.New(params)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(s.URL))
	}
}

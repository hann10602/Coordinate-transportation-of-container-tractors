package ginpayment

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/storage"
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
		var order *entitymodel.TPaymentCheckout

		if err := c.ShouldBind(&order); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		totalPrice, err := strconv.Atoi(order.TotalPrice)
		if err != nil {
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
							Name: stripe.String(fmt.Sprintf("Delivery request %s", order.Type)),
						},
						UnitAmount: stripe.Int64(int64(totalPrice)),
					},
					Quantity: stripe.Int64(1),
				},
			},
			SuccessURL: stripe.String("http://localhost:3000/payment-completed"),
			CancelURL:  stripe.String("http://localhost:3000/payment-failure"),
			Metadata: map[string]string{
				"type":                order.Type,
				"totalPrice":          order.TotalPrice,
				"deliveryDate":        order.DeliveryDate,
				"detailAddress":       order.DetailAddress,
				"note":                order.Note,
				"userId":              order.UserId,
				"portId":              order.PortId,
				"customerWarehouseId": order.CustomerWarehouseId,
				"startTrailerId":      order.StartTrailerId,
				"endTrailerId":        order.EndTrailerId,
				"containerId":         order.ContainerId,
			},
		}

		s, err := session.New(params)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(s.URL))
	}
}

func HandleStripeWebhook(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		const MaxBodyBytes = int64(65536)
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, MaxBodyBytes)
		payload, err := ioutil.ReadAll(c.Request.Body)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		event := stripe.Event{}

		if err := json.Unmarshal(payload, &event); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if event.Type == "checkout.session.completed" {
			var session stripe.CheckoutSession
			err := json.Unmarshal(event.Data.Raw, &session)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			order := &entitymodel.OrderCreated{
				TotalPrice:          func() int32 { i, _ := strconv.Atoi(session.Metadata["totalPrice"]); return int32(i) }(),
				CurrentPosition:     0,
				DetailAddress:       session.Metadata["detailAddress"],
				Note:                session.Metadata["note"],
				DeliveryDate:        func() *time.Time { t, _ := time.Parse("2006-01-02", session.Metadata["deliveryDate"]); return &t }(),
				Status:              "Pending",
				TruckId:             nil,
				Type:                session.Metadata["type"],
				UserId:              func() int64 { i, _ := strconv.Atoi(session.Metadata["userId"]); return int64(i) }(),
				CustomerWarehouseId: func() int64 { i, _ := strconv.Atoi(session.Metadata["customerWarehouseId"]); return int64(i) }(),
				StartTrailerId:      func() int64 { i, _ := strconv.Atoi(session.Metadata["startTrailerId"]); return int64(i) }(),
				EndTrailerId:        func() int64 { i, _ := strconv.Atoi(session.Metadata["endTrailerId"]); return int64(i) }(),
			}

			if session.Metadata["portId"] != "" {
				i, _ := strconv.Atoi(session.Metadata["portId"])
				i64 := int64(i)

				order.PortId = &i64
			}

			if session.Metadata["containerId"] != "" {
				i, _ := strconv.Atoi(session.Metadata["containerId"])
				i64 := int64(i)

				order.ContainerId = &i64
			}

			store := storage.NewSqlStore(db)
			business := biz.NewCreateOrderBiz(store)

			if err := business.CreateNewOrder(c.Request.Context(), []*entitymodel.OrderCreated{order}); err != nil {
				c.JSON(http.StatusBadRequest, err)

				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"status": "success"})
	}
}

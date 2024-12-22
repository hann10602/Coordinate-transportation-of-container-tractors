package ginorder

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/storage"
	"gorm.io/gorm"
)

func ConvertOrderCreatedFromInput(ordersInput []*modelorder.OrderCreatedInput) []*modelorder.OrderCreated {
	orders := make([]*modelorder.OrderCreated, len(ordersInput))

	for i, order := range ordersInput {
		deliveryDatePointer := &order.DeliveryDate.Time

		orders[i] = &modelorder.OrderCreated{
			TotalPrice:          order.TotalPrice,
			DeliveryDate:        deliveryDatePointer,
			Status:              modelorder.WAIT,
			DetailAddress:       order.DetailAddress,
			Note:                order.Note,
			Type:                order.Type,
			CurrentPosition:     order.CurrentPosition,
			UserId:              order.UserId,
			TruckId:             order.TruckId,
			PortId:              order.PortId,
			CustomerWarehouseId: order.CustomerWarehouseId,
			StartTrailerId:      order.StartTrailerId,
			EndTrailerId:        order.EndTrailerId,
			ContainerId:         order.ContainerId,
		}
	}

	return orders
}

func CreateOrder(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var ordersInput []*modelorder.OrderCreatedInput

		if err := c.ShouldBind(&ordersInput); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		var orders []*modelorder.OrderCreated = ConvertOrderCreatedFromInput(ordersInput)

		store := storage.NewSqlStore(db)

		business := biz.NewCreateOrderBiz(store)

		if err := business.CreateNewOrder(c.Request.Context(), orders); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(orders))
	}
}

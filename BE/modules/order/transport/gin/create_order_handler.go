package ginorder

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/storage"
	"gorm.io/gorm"
)

func ConvertOrderCreatedFromInput(ordersInput []*entitymodel.OrderCreatedInput) []*entitymodel.OrderCreated {
	orders := make([]*entitymodel.OrderCreated, len(ordersInput))

	for i, order := range ordersInput {
		deliveryDatePointer := &order.DeliveryDate.Time

		orders[i] = &entitymodel.OrderCreated{
			TotalPrice:          order.TotalPrice,
			Distance:            order.Distance,
			DeliveryDate:        deliveryDatePointer,
			Status:              entitymodel.WAIT,
			DetailAddress:       order.DetailAddress,
			Note:                order.Note,
			Type:                order.Type,
			CurrentPosition:     order.CurrentPosition,
			UserId:              order.UserId,
			TruckId:             nil,
			PortId:              nil,
			CustomerWarehouseId: order.CustomerWarehouseId,
			StartTrailerId:      order.StartTrailerId,
			EndTrailerId:        order.EndTrailerId,
			ContainerId:         nil,
		}
	}

	return orders
}

func CreateOrder(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var ordersInput []*entitymodel.OrderCreatedInput

		if err := c.ShouldBind(&ordersInput); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		var orders []*entitymodel.OrderCreated = ConvertOrderCreatedFromInput(ordersInput)

		store := storage.NewSqlStore(db)

		business := biz.NewCreateOrderBiz(store)

		if err := business.CreateNewOrder(c.Request.Context(), orders); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(orders))
	}
}

package ginorder

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/storage"
	"gorm.io/gorm"
)

func AutomaticDeliveryAssignedOrder(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		store := storage.NewSqlStore(db)

		business := biz.NewAutomaticDeliveryAssignedOrderBiz(store)

		idList, err := business.TruckList(c)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		orderList, err := business.FindOrderWithoutAssigned(c)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		if err := business.AutomaticDeliveryAssignedOrder(c, orderList, idList); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		truckWithoutOrdersList, err := business.CheckTrucksWithoutOrders(c)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		idList, err = business.TruckList(c)
		for _, truckID := range idList {
			if !common.Contains(truckWithoutOrdersList, truckID.Id) {
				if err := business.ImplementOrder(c, truckID.Id); err != nil {
					c.JSON(http.StatusBadRequest, err)

					return
				}
			}
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse("Successfully"))
	}
}

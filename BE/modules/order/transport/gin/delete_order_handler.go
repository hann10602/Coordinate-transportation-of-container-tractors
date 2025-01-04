package ginorder

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/storage"
	"gorm.io/gorm"
)

func DeleteOrder(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		store := storage.NewSqlStore(db)

		business := biz.NewDeleteOrderBiz(store)

		order, err := business.GetOrderById(c, id)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		err = business.DeleteOrderById(c, id)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		if order.Status == "OnGoing" {
			err = business.ImplementOrder(c, order.TruckId)

			if err != nil {
				c.JSON(http.StatusBadRequest, err)

				return
			}
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse("Successfully"))
	}
}

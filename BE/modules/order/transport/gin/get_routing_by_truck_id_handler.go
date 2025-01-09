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

func GetRoutingByTruckId(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		truckId, err := strconv.Atoi(c.Param("truck-id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		store := storage.NewSqlStore(db)

		business := biz.NewGetRoutingByTruckIdBiz(store)

		data, err := business.GetRoutingByTruckId(c, truckId)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data))
	}
}

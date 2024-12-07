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

func CreateOrder(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data []*modelorder.OrderCreated

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		// data.Status = modelorder.WORKING

		store := storage.NewSqlStore(db)

		business := biz.NewCreateOrderBiz(store)

		if err := business.CreateNewOrder(c.Request.Context(), data); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data))
	}
}

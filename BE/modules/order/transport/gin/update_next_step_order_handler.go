package ginorder

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/order/storage"
	"gorm.io/gorm"
)

func UpdateNextStepOrder(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data *entitymodel.OrderUpdated

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		truckId, err := strconv.Atoi(c.Param("truck-id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))
		}

		store := storage.NewSqlStore(db)

		business := biz.NewUpdateNextStepOrderBiz(store)

		if data.CurrentPosition == 2 {
			if err := business.ChangeBetweenOrder(c, int64(truckId), id, data); err != nil {
				c.JSON(http.StatusBadRequest, err)

				return
			}
		} else {
			if data.CurrentPosition == 3 {
				data.Status = entitymodel.DONE

				if err := business.UpdateNextStepOrderById(c, id, data); err != nil {
					c.JSON(http.StatusBadRequest, err)

					return
				}

				if err := business.ImplementOrder(c, int64(truckId)); err != nil {
					c.JSON(http.StatusBadRequest, err)

					return
				}
			} else {
				if err := business.UpdateNextStepOrderById(c, id, data); err != nil {
					c.JSON(http.StatusBadRequest, err)

					return
				}
			}
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse("Successfully"))
	}
}

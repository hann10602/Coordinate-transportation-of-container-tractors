package gintruck

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/truck/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/truck/storage"
	"gorm.io/gorm"
)

func GetListTruck(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var filter entitymodel.Filter

		if err := c.ShouldBind(&filter); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		store := storage.NewSqlStore(db)

		business := biz.NewGetListTruckBiz(store)

		data, err := business.FindListTruck(c, filter)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data))
	}
}

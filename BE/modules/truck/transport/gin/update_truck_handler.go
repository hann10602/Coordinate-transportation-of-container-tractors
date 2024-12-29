package gintruck

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/truck/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/truck/storage"
	"gorm.io/gorm"
)

func UpdateTruck(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data *entitymodel.TruckUpdated

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))
		}

		store := storage.NewSqlStore(db)

		business := biz.NewUpdateTruckBiz(store)

		if err := business.UpdateTruckById(c, id, data); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse("Successfully"))
	}
}

package gintruck

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeltruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/truck"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/truck/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/truck/storage"
	"gorm.io/gorm"
)

func CreateTruck(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var trucks []*modeltruck.TruckCreated

		if err := c.ShouldBind(&trucks); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		for _, truck := range trucks {
			truck.Status = modeltruck.ACTIVE
		}

		store := storage.NewSqlStore(db)

		business := biz.NewCreateTruckBiz(store)

		if err := business.CreateNewTruck(c.Request.Context(), trucks); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(trucks))
	}
}

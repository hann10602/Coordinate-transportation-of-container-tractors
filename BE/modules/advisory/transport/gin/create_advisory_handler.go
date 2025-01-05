package ginuser

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/advisory/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/advisory/storage"
	"gorm.io/gorm"
)

func CreateAdvisory(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data entitymodel.AdvisoryCreated

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		store := storage.NewSqlStore(db)

		business := biz.NewCreateAdvisoryBiz(store)

		if err := business.CreateNewAdvisory(c.Request.Context(), &data); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data.Id))
	}
}

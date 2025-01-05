package ginuser

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/advisory/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/advisory/storage"
	"gorm.io/gorm"
)

func GetListAdvisory(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging common.Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		paging.Process()

		store := storage.NewSqlStore(db)

		business := biz.NewGetListAdvisoryBiz(store)

		data, paging, err := business.FindListAdvisory(c, paging)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.NewSuccessResponse(data, paging, nil))
	}
}

package gindump

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/dump/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/dump/storage"
	"gorm.io/gorm"
)

func GetListDump(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var filter modeldump.Filter

		if err := c.ShouldBind(&filter); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		store := storage.NewSqlStore(db)

		business := biz.NewGetListDumpBiz(store)

		data, err := business.FindListDump(c, filter)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data))
	}
}

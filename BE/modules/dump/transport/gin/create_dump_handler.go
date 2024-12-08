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

func CreateDump(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var dumps []*modeldump.DumpCreated

		if err := c.ShouldBind(&dumps); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		for _, dump := range dumps {
			dump.Status = modeldump.WORKING
		}

		store := storage.NewSqlStore(db)

		business := biz.NewCreateDumpBiz(store)

		if err := business.CreateNewDump(c.Request.Context(), dumps); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(dumps))
	}
}

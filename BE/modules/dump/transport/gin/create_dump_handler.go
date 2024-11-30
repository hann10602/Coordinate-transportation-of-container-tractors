package gindump

import (
	"fmt"
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
		var data modeldump.DumpCreated

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		data.Status = modeldump.WORKING

		store := storage.NewSqlStore(db)

		business := biz.NewCreateDumpBiz(store)

		fmt.Println(&data)

		if err := business.CreateNewDump(c.Request.Context(), &data); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data.Id))
	}
}

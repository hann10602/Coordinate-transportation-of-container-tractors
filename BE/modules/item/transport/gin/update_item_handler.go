package ginitem

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/storage"
	"gorm.io/gorm"
)

func UpdateItem(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data *model.TodoItemUpdated

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}

		store := storage.NewSqlStore(db)

		business := biz.NewUpdateItemBiz(store)

		if err := business.UpdateItemById(c, id, data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse("Successfully"))
	}
}

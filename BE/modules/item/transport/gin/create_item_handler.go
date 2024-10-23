package ginitem

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/model"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/storage"
	"gorm.io/gorm"
)

func CreateItem(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data model.TodoItemCreated

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		jsonData, err := json.Marshal(data)

		fmt.Println(string(jsonData), err)

		store := storage.NewSqlStore(db)

		business := biz.NewCreateItemBiz(store)

		if err := business.CreateNewItem(c.Request.Context(), &data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data.Id))
	}
}

package ginuser

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/user/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/user/storage"
	"gorm.io/gorm"
)

func CreateUser(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data modeluser.UserCreated

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		data.Status = modeluser.ACTIVE
		data.Role = modeluser.USER

		store := storage.NewSqlStore(db)

		business := biz.NewCreateUserBiz(store)

		if err := business.CreateNewUser(c.Request.Context(), &data); err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(data.Id))
	}
}

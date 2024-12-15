package ginauth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelauth "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/auth"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/auth/biz"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/auth/storage"
	"gorm.io/gorm"
)

func Login(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var loginParams modelauth.Login

		if err := c.ShouldBind(&loginParams); err != nil {
			c.JSON(http.StatusBadRequest, common.ErrInvalidRequest(err))

			return
		}

		store := storage.NewSqlStore(db)

		business := biz.NewLoginBiz(store)

		token, err := business.GetUserByUsernameAndPassword(c, loginParams)

		if err != nil {
			c.JSON(http.StatusBadRequest, err)

			return
		}

		c.JSON(http.StatusOK, common.SimpleSuccessResponse(token))
	}
}

package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelauth "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/auth"
	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
	"gorm.io/gorm"
)

func (s *sqlStore) GetUserByUsernameAndPassword(ctx context.Context, loginParams modelauth.Login) (*modeluser.User, error) {
	var data modeluser.User

	if err := s.db.Where("username = ? AND password = ?", loginParams.Username, loginParams.Password).First(&data).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, common.ErrRecordNotFound(modelauth.ErrWrongUsernameOrPassword)
		}

		return nil, common.ErrDB(err)
	}

	return &data, nil
}

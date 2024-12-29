package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) GetUserByUsernameAndPassword(ctx context.Context, loginParams entitymodel.Login) (*entitymodel.User, error) {
	var data entitymodel.User

	if err := s.db.Where("username = ? AND password = ?", loginParams.Username, loginParams.Password).First(&data).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, common.ErrRecordNotFound(entitymodel.ErrWrongUsernameOrPassword)
		}

		return nil, common.ErrDB(err)
	}

	return &data, nil
}

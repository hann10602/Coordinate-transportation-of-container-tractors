package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
	"gorm.io/gorm"
)

func (s *sqlStore) GetUser(ctx context.Context, cond map[string]interface{}) (*modeluser.User, error) {
	var data modeluser.User

	if err := s.db.Where(cond).Preload("Orders").First(&data).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, common.ErrRecordNotFound(err)
		}

		return nil, common.ErrDB(err)
	}

	return &data, nil
}

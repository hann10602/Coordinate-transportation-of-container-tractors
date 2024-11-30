package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
	"gorm.io/gorm"
)

func (s *sqlStore) UpdateUser(ctx context.Context, cond map[string]interface{}, dataUpdated *modeluser.UserUpdated) error {
	if err := s.db.Where(cond).Updates(&dataUpdated).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

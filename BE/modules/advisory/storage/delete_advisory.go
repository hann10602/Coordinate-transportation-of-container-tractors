package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) DeleteAdvisory(ctx context.Context, cond map[string]interface{}) error {
	if err := s.db.Table(entitymodel.Advisory{}.TableName()).Where(cond).Delete(&entitymodel.Advisory{}, cond).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}
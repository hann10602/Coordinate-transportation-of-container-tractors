package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) DeleteOrder(ctx context.Context, cond map[string]interface{}) error {
	query := s.db.Session(&gorm.Session{}).Table(entitymodel.Order{}.TableName()).Where(cond).Delete(&entitymodel.Order{}, cond)

	if err := query.Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

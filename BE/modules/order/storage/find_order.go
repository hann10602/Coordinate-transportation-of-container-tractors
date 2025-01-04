package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) GetOrder(ctx context.Context, cond map[string]interface{}) (*entitymodel.Order, error) {
	var data entitymodel.Order

	query := s.db.Session(&gorm.Session{})

	if err := query.Where(cond).
		Preload("Port").
		Preload("CustomerWarehouse").
		Preload("StartTrailer").
		Preload("EndTrailer").
		Preload("Container").
		First(&data).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, common.ErrRecordNotFound(err)
		}

		return nil, common.ErrDB(err)
	}

	return &data, nil
}

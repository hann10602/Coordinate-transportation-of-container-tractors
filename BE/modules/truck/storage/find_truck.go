package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeltruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/truck"
	"gorm.io/gorm"
)

func (s *sqlStore) GetTruck(ctx context.Context, cond map[string]interface{}) (*modeltruck.Truck, error) {
	var data modeltruck.Truck

	if err := s.db.Where(cond).First(&data).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, common.ErrRecordNotFound(err)
		}

		return nil, common.ErrDB(err)
	}

	return &data, nil
}

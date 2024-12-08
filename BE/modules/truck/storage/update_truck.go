package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeltruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/truck"
	"gorm.io/gorm"
)

func (s *sqlStore) UpdateTruck(ctx context.Context, cond map[string]interface{}, dataUpdated *modeltruck.TruckUpdated) error {
	if err := s.db.Where(cond).Updates(&dataUpdated).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

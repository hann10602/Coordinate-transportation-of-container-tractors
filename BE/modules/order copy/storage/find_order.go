package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
	"gorm.io/gorm"
)

func (s *sqlStore) GetOrder(ctx context.Context, cond map[string]interface{}) (*modelorder.Order, error) {
	var data modelorder.Order

	if err := s.db.Where(cond).First(&data).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, common.ErrRecordNotFound(err)
		}

		return nil, common.ErrDB(err)
	}

	return &data, nil
}

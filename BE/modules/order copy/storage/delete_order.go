package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
	"gorm.io/gorm"
)

func (s *sqlStore) DeleteOrder(ctx context.Context, cond map[string]interface{}) error {
	if err := s.db.Table(modelorder.Order{}.TableName()).Where(cond).Updates(map[string]interface{}{
		"status": modelorder.DELETED,
	}).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) ImplementOrder(ctx context.Context, id int64) error {
	var order entitymodel.Order

	queryDB := s.db.Session(&gorm.Session{}).Table(entitymodel.Order{}.TableName())

	if err := queryDB.
		Where("status IN ('Pending', 'Waiting') AND truck_id = ?", id).
		Order("delivery_date ASC").
		First(&order).Error; err != nil {
		if err != gorm.ErrRecordNotFound {
			return common.ErrDB(err)
		}
	} else {
		if err := s.db.
			Model(&order).
			Updates(entitymodel.OrderUpdated{
				Status: "OnGoing",
			}).Error; err != nil {
			return common.ErrDB(err)
		}
	}

	return nil
}

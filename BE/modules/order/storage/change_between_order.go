package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) ChangeBetweenOrder(ctx context.Context, truckId int64, cond map[string]interface{}, dataUpdated *entitymodel.OrderUpdated) error {
	var order entitymodel.Order

	getOrderListQuery := s.db.Session(&gorm.Session{}).Table(entitymodel.Order{}.TableName())

	if err := getOrderListQuery.
		Where("status IN ('Pending', 'Waiting') AND truck_id = ?", truckId).
		Order("delivery_date ASC").
		First(&order).Error; err != nil {
		if err != gorm.ErrRecordNotFound {
			return common.ErrDB(err)
		} else {
			if err := s.db.Where(cond).Updates(&dataUpdated).Error; err != nil {
				if err == gorm.ErrRecordNotFound {
					return common.ErrRecordNotFound(err)
				}
		
				return common.ErrDB(err)
			}
		}
	} else {
		currentOrderQuery := s.db.Session(&gorm.Session{}).Table(entitymodel.Order{}.TableName())
		if err := currentOrderQuery.
			Where(cond).
			Updates(entitymodel.OrderUpdatedSequently{
				Status: "Done",
			}).Error; err != nil {
			return common.ErrDB(err)
		}

		nextOrderQuery := s.db.Session(&gorm.Session{}).Table(entitymodel.Order{}.TableName())
		if err := nextOrderQuery.
			Model(&order).
			Updates(entitymodel.OrderUpdatedSequently{
				Status: "OnGoing",
			}).Error; err != nil {
			return common.ErrDB(err)
		}
	}

	return nil
}

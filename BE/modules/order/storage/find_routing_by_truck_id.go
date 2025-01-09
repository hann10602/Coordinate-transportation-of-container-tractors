package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) GetRoutingByTruckId(ctx context.Context, truckId int) (*entitymodel.OrderGetRoutingByTruckId, error) {
	data := &entitymodel.OrderGetRoutingByTruckId{}

	query := s.db.Session(&gorm.Session{}).Table(entitymodel.Order{}.TableName())

	if err := query.Where("status IN ('OnGoing', 'Waiting')  AND truck_id = ?", truckId).
		Preload("Port").
		Preload("CustomerWarehouse").
		Preload("StartTrailer").
		Preload("EndTrailer").
		Preload("Container").
		Order("delivery_date ASC").
		Find(&data.RoutingList).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, common.ErrRecordNotFound(err)
		}

		return nil, common.ErrDB(err)
	}

	return data, nil
}

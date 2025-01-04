package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) CheckTrucksWithoutOrders(ctx context.Context) ([]int, error) {
	var truckIdsInOrders []int

	queryDB := s.db.Session(&gorm.Session{})

	if err := queryDB.Table(entitymodel.Order{}.TableName()).
		Select("truck_id").
		Where("status = 'OnGoing'").
		Find(&truckIdsInOrders).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return truckIdsInOrders, nil
}

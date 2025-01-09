package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) CountRoutingDistance(ctx context.Context, truckId int) (int64, error) {
	var totalDistance int64

	queryDB := s.db.Session(&gorm.Session{}).Table(entitymodel.Order{}.TableName())

	if err := queryDB.Select("SUM(distance)").Where("truck_id = ?", truckId).Scan(&totalDistance).Error; err != nil {
		return 0, common.ErrDB(err)
	}

	return totalDistance, nil
}

package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) GetListTruck(ctx context.Context, filter entitymodel.Filter) ([]entitymodel.TruckGetList, error) {
	var data []entitymodel.TruckGetList
	// filters := map[string]interface{}{}

	s.db = s.db.Table(entitymodel.Truck{}.TableName())

	if err := s.db.Where(filter).Find(&data).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return data, nil
}

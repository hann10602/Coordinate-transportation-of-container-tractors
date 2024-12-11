package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeltruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/truck"
)

func (s *sqlStore) GetListTruck(ctx context.Context, filter modeltruck.Filter) ([]modeltruck.TruckGetList, error) {
	var data []modeltruck.TruckGetList
	// filters := map[string]interface{}{}

	s.db = s.db.Table(modeltruck.Truck{}.TableName())

	if err := s.db.Where(filter).Find(&data).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return data, nil
}

package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) GetListOrder(ctx context.Context, filter entitymodel.Filter) ([]entitymodel.OrderGetList, error) {
	var data []entitymodel.OrderGetList
	// filters := map[string]interface{}{}

	s.db = s.db.Table(entitymodel.Order{}.TableName())

	if err := s.db.Preload("User").Where(filter).Find(&data).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return data, nil
}

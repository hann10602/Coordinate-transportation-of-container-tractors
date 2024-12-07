package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
)

func (s *sqlStore) GetListOrder(ctx context.Context, filter modelorder.Filter) ([]modelorder.OrderGetList, error) {
	var data []modelorder.OrderGetList
	// filters := map[string]interface{}{}

	s.db = s.db.Table(modelorder.Order{}.TableName())

	if err := s.db.Order("id desc").Where(filter).Find(&data).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return data, nil
}

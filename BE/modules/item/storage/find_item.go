package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/model"
)

func (s *sqlStore) GetItem(ctx context.Context, cond map[string]interface{}) (*model.TodoItem, error) {
	var data model.TodoItem

	if err := s.db.Where(cond).First(&data).Error; err != nil {
		return nil, err
	}

	return &data, nil
}

package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/model"
)

func (s *sqlStore) CreateItem(ctx context.Context, data *model.TodoItemCreated) error {
	if err := s.db.Create(&data).Error; err != nil {
		return err
	}

	return nil
}

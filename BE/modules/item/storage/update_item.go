package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/model"
)

func (s *sqlStore) UpdateItem(ctx context.Context, cond map[string]interface{}, dataUpdated *model.TodoItemUpdated) error {
	if err := s.db.Where(cond).Updates(&dataUpdated).Error; err != nil {
		return err
	}

	return nil
}

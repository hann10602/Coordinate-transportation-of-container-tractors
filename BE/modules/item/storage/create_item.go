package storage

import (
	"context"
	"fmt"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/model"
)

func (s *sqlStore) CreateItem(ctx context.Context, data *model.TodoItemCreated) error {
	fmt.Sprintln(data)
	if err := s.db.Create(&data).Error; err != nil {
		return err
	}

	return nil
}

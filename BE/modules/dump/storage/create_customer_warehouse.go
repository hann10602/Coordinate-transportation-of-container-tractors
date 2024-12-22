package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
)

func (s *sqlStore) CreateCustomerWarehouse(ctx context.Context, data []*modeldump.CustomerWarehouseCreated) error {
	if err := s.db.Create(&data).Error; err != nil {
		return common.ErrDB(err)
	}

	return nil
}

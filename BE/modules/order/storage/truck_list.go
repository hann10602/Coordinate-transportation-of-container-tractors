package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) TruckList(ctx context.Context) ([]entitymodel.TruckId, error) {
	var idList []entitymodel.TruckId

	if err := s.db.Table(entitymodel.Truck{}.TableName()).Where("status != 'Deleted'").Find(&idList).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return idList, nil
}

package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) FindOrderWithoutAssigned(ctx context.Context) ([]entitymodel.OrderId, error) {
	var data []entitymodel.OrderId

	queryDB := s.db.Session(&gorm.Session{}).Table(entitymodel.Order{}.TableName())

	if err := queryDB.Where("status = ?", "Pending").Find(&data).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return data, nil
}

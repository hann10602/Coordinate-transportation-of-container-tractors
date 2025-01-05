package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) CreateAdvisory(ctx context.Context, data *entitymodel.AdvisoryCreated) error {
	if err := s.db.Table(entitymodel.Advisory{}.TableName()).Create(&data).Error; err != nil {
		return common.ErrDB(err)
	}

	return nil
}

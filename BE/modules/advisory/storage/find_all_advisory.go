package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) GetListAdvisory(ctx context.Context, paging common.Paging) ([]entitymodel.Advisory, common.Paging, error) {
	var data []entitymodel.Advisory

	s.db = s.db.Table(entitymodel.Advisory{}.TableName())

	if err := s.db.Count(&paging.Total).Error; err != nil {
		return nil, common.Paging{}, common.ErrDB(err)
	}

	if err := s.db.Offset((paging.Page - 1) * paging.Limit).Limit(paging.Limit).Find(&data).Error; err != nil {
		return nil, common.Paging{}, common.ErrDB(err)
	}

	return data, paging, nil
}

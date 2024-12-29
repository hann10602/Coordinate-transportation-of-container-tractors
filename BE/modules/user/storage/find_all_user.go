package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) GetListUser(ctx context.Context, paging common.Paging) ([]entitymodel.User, common.Paging, error) {
	var data []entitymodel.User

	s.db = s.db.Table(entitymodel.User{}.TableName())

	if err := s.db.Count(&paging.Total).Error; err != nil {
		return nil, common.Paging{}, common.ErrDB(err)
	}

	if err := s.db.Offset((paging.Page - 1) * paging.Limit).Limit(paging.Limit).Find(&data).Error; err != nil {
		return nil, common.Paging{}, common.ErrDB(err)
	}

	return data, paging, nil
}

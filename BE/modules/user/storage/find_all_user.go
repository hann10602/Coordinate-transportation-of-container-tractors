package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) GetListUser(ctx context.Context, paging common.Paging) ([]model.TUser, common.Paging, error) {
	var data []model.TUser

	if err := s.db.Table(model.TUser{}.TableName()).Count(&paging.Total).Error; err != nil {
		return nil, common.Paging{}, common.ErrDB(err)
	}

	if err := s.db.Order("id desc").Offset((paging.Page - 1) * paging.Limit).Limit(paging.Limit).Find(&data).Error; err != nil {
		return nil, common.Paging{}, common.ErrDB(err)
	}

	return data, paging, nil
}

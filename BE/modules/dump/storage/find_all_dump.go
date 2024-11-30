package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
)

func (s *sqlStore) GetListDump(ctx context.Context, paging common.Paging) ([]modeldump.Dump, common.Paging, error) {
	var data []modeldump.Dump

	if err := s.db.Table(modeldump.Dump{}.TableName()).Count(&paging.Total).Error; err != nil {
		return nil, common.Paging{}, common.ErrDB(err)
	}

	if err := s.db.Order("id desc").Offset((paging.Page - 1) * paging.Limit).Limit(paging.Limit).Find(&data).Error; err != nil {
		return nil, common.Paging{}, common.ErrDB(err)
	}

	return data, paging, nil
}

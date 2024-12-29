package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) GetListDump(ctx context.Context, filter entitymodel.Filter) ([]entitymodel.DumpGetList, error) {
	var data []entitymodel.DumpGetList
	// filters := map[string]interface{}{}

	s.db = s.db.Table(entitymodel.Dump{}.TableName())

	if err := s.db.Where(filter).Find(&data).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return data, nil
}

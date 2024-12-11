package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
)

func (s *sqlStore) GetListDump(ctx context.Context, filter modeldump.Filter) ([]modeldump.DumpGetList, error) {
	var data []modeldump.DumpGetList
	// filters := map[string]interface{}{}

	s.db = s.db.Table(modeldump.Dump{}.TableName())

	if err := s.db.Where(filter).Find(&data).Error; err != nil {
		return nil, common.ErrDB(err)
	}

	return data, nil
}

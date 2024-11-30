package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
	"gorm.io/gorm"
)

func (s *sqlStore) UpdateDump(ctx context.Context, cond map[string]interface{}, dataUpdated *modeldump.DumpUpdated) error {
	if err := s.db.Where(cond).Updates(&dataUpdated).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

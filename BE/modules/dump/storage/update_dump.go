package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) UpdateDump(ctx context.Context, cond map[string]interface{}, dataUpdated *entitymodel.DumpUpdated) error {
	if err := s.db.Where(cond).Updates(&dataUpdated).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

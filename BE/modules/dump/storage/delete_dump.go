package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
	"gorm.io/gorm"
)

func (s *sqlStore) DeleteDump(ctx context.Context, cond map[string]interface{}) error {
	if err := s.db.Table(modeldump.Dump{}.TableName()).Where(cond).Updates(map[string]interface{}{
		"status": modeldump.CLOSED,
	}).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

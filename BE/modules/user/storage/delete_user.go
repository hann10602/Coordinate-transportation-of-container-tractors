package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"gorm.io/gorm"
)

func (s *sqlStore) DeleteUser(ctx context.Context, cond map[string]interface{}) error {
	if err := s.db.Where(cond).Updates(map[string]interface{}{
		"status": "Deleted",
	}).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

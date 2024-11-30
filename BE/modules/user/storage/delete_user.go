package storage

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
	"gorm.io/gorm"
)

func (s *sqlStore) DeleteUser(ctx context.Context, cond map[string]interface{}) error {
	if err := s.db.Table(modeluser.User{}.TableName()).Where(cond).Updates(map[string]interface{}{
		"status": modeluser.DELETED,
	}).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return common.ErrRecordNotFound(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

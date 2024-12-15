package storage

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
)

func (s *sqlStore) CreateUser(ctx context.Context, data *modeluser.UserCreated) error {
	if err := s.db.Create(&data).Error; err != nil {
		if strings.Contains(err.Error(), "Error 1062") {
			return common.ErrUserExist(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

package storage

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) CreateUser(ctx context.Context, data *entitymodel.UserCreated) error {
	if err := s.db.Create(&data).Error; err != nil {
		if strings.Contains(err.Error(), "Error 1062") {
			return common.ErrUserExist(err)
		}

		return common.ErrDB(err)
	}

	return nil
}

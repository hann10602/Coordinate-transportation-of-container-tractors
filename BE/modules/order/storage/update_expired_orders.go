package storage

import (
	"context"
	"time"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

func (s *sqlStore) UpdateExpiredOrders(ctx context.Context) error {
    today := time.Now().Format("2006-01-02")

    if err := s.db.Model(&entitymodel.Order{}).
        Where("delivery_date < ? AND status NOT IN ('Done', 'Expired')", today).
        Update("status", "Expired").Error; err != nil {
        return common.ErrDB(err)
    }

    return nil
}
package biz

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type CreateTruckStorage interface {
	CreateTruck(ctx context.Context, data []*entitymodel.TruckCreated) error
}

type createTruckBiz struct {
	store CreateTruckStorage
}

func NewCreateTruckBiz(store CreateTruckStorage) *createTruckBiz {
	return &createTruckBiz{store: store}
}

func (biz *createTruckBiz) CreateNewTruck(ctx context.Context, data []*entitymodel.TruckCreated) error {
	for _, truck := range data {
		title := strings.TrimSpace(truck.Title)

		if title == "" {
			return common.ErrInvalidRequest(entitymodel.ErrTitleIsEmpty)
		}
	}

	if err := biz.store.CreateTruck(ctx, data); err != nil {
		return err
	}

	return nil
}

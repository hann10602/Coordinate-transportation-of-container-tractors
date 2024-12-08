package biz

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeltruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/truck"
)

type CreateTruckStorage interface {
	CreateTruck(ctx context.Context, data []*modeltruck.TruckCreated) error
}

type createTruckBiz struct {
	store CreateTruckStorage
}

func NewCreateTruckBiz(store CreateTruckStorage) *createTruckBiz {
	return &createTruckBiz{store: store}
}

func (biz *createTruckBiz) CreateNewTruck(ctx context.Context, data []*modeltruck.TruckCreated) error {
	for _, truck := range data {
		title := strings.TrimSpace(truck.Title)

		if title == "" {
			return common.ErrInvalidRequest(modeltruck.ErrTitleIsEmpty)
		}
	}

	if err := biz.store.CreateTruck(ctx, data); err != nil {
		return err
	}

	return nil
}

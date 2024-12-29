package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetTruckStorage interface {
	GetTruck(ctx context.Context, cond map[string]interface{}) (*entitymodel.Truck, error)
}

type getTruckBiz struct {
	store GetTruckStorage
}

func NewGetTruckBiz(store GetTruckStorage) *getTruckBiz {
	return &getTruckBiz{store: store}
}

func (biz *getTruckBiz) GetTruckById(ctx context.Context, id int) (*entitymodel.Truck, error) {
	data, err := biz.store.GetTruck(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return nil, err
	}

	return data, nil
}

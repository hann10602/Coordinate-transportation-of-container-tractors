package biz

import (
	"context"

	modeltruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/truck"
)

type GetTruckStorage interface {
	GetTruck(ctx context.Context, cond map[string]interface{}) (*modeltruck.Truck, error)
}

type getTruckBiz struct {
	store GetTruckStorage
}

func NewGetTruckBiz(store GetTruckStorage) *getTruckBiz {
	return &getTruckBiz{store: store}
}

func (biz *getTruckBiz) GetTruckById(ctx context.Context, id int) (*modeltruck.Truck, error) {
	data, err := biz.store.GetTruck(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return nil, err
	}

	return data, nil
}

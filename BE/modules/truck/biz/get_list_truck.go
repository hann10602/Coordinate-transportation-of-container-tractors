package biz

import (
	"context"

	modeltruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/truck"
)

type GetListTruckStorage interface {
	GetListTruck(ctx context.Context, filter modeltruck.Filter) ([]modeltruck.TruckGetList, error)
}

type getListTruckBiz struct {
	store GetListTruckStorage
}

func NewGetListTruckBiz(store GetListTruckStorage) *getListTruckBiz {
	return &getListTruckBiz{store: store}
}

func (biz *getListTruckBiz) FindListTruck(ctx context.Context, filter modeltruck.Filter) ([]modeltruck.TruckGetList, error) {
	data, err := biz.store.GetListTruck(ctx, filter)

	if err != nil {
		return nil, err
	}

	return data, nil
}

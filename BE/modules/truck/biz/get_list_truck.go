package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetListTruckStorage interface {
	GetListTruck(ctx context.Context, filter entitymodel.Filter) ([]entitymodel.TruckGetList, error)
}

type getListTruckBiz struct {
	store GetListTruckStorage
}

func NewGetListTruckBiz(store GetListTruckStorage) *getListTruckBiz {
	return &getListTruckBiz{store: store}
}

func (biz *getListTruckBiz) FindListTruck(ctx context.Context, filter entitymodel.Filter) ([]entitymodel.TruckGetList, error) {
	data, err := biz.store.GetListTruck(ctx, filter)

	if err != nil {
		return nil, err
	}

	return data, nil
}

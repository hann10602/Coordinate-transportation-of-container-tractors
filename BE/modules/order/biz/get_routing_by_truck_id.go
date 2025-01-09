package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetRoutingByTruckIdStorage interface {
	GetRoutingByTruckId(ctx context.Context, truckId int) (*entitymodel.OrderGetRoutingByTruckId, error)
	CountRoutingDistance(ctx context.Context, truckId int) (int64, error)
}

type getRoutingByTruckIdBiz struct {
	store GetRoutingByTruckIdStorage
}

func NewGetRoutingByTruckIdBiz(store GetRoutingByTruckIdStorage) *getRoutingByTruckIdBiz {
	return &getRoutingByTruckIdBiz{store: store}
}

func (biz *getRoutingByTruckIdBiz) GetRoutingByTruckId(ctx context.Context, truckId int) (*entitymodel.OrderGetRoutingByTruckId, error) {
	data, err := biz.store.GetRoutingByTruckId(ctx, truckId)

	if err != nil {
		return nil, err
	}

	if truckId != 0 {
		totalDistance, err := biz.store.CountRoutingDistance(ctx, truckId)

		if err != nil {
			return nil, err
		}

		data.TotalDistance = totalDistance
	}

	return data, nil
}

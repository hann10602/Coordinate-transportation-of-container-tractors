package biz

import (
	"context"

	modeltruck "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/truck"
)

type UpdateTruckStorage interface {
	GetTruck(ctx context.Context, cond map[string]interface{}) (*modeltruck.Truck, error)
	UpdateTruck(ctx context.Context, cond map[string]interface{}, dataUpdated *modeltruck.TruckUpdated) error
}

type updateTruckBiz struct {
	store UpdateTruckStorage
}

func NewUpdateTruckBiz(store UpdateTruckStorage) *updateTruckBiz {
	return &updateTruckBiz{store: store}
}

func (biz *updateTruckBiz) UpdateTruckById(ctx context.Context, id int, dataUpdated *modeltruck.TruckUpdated) error {
	truck, err := biz.store.GetTruck(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateTruck(ctx, map[string]interface{}{"id": truck.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

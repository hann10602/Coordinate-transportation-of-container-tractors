package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type UpdateTruckStorage interface {
	GetTruck(ctx context.Context, cond map[string]interface{}) (*entitymodel.Truck, error)
	UpdateTruck(ctx context.Context, cond map[string]interface{}, dataUpdated *entitymodel.TruckUpdated) error
}

type updateTruckBiz struct {
	store UpdateTruckStorage
}

func NewUpdateTruckBiz(store UpdateTruckStorage) *updateTruckBiz {
	return &updateTruckBiz{store: store}
}

func (biz *updateTruckBiz) UpdateTruckById(ctx context.Context, id int, dataUpdated *entitymodel.TruckUpdated) error {
	truck, err := biz.store.GetTruck(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateTruck(ctx, map[string]interface{}{"id": truck.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

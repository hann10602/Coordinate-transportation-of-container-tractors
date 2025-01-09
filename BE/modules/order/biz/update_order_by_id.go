package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type UpdateOrderStorage interface {
	GetOrder(ctx context.Context, cond map[string]interface{}) (*entitymodel.Order, error)
	CheckTrucksWithoutOrders(ctx context.Context) ([]int, error)
	UpdateOrder(ctx context.Context, cond map[string]interface{}, dataUpdated *entitymodel.OrderUpdated) error
}

type updateOrderBiz struct {
	store UpdateOrderStorage
}

func NewUpdateOrderBiz(store UpdateOrderStorage) *updateOrderBiz {
	return &updateOrderBiz{store: store}
}

func (biz *updateOrderBiz) UpdateOrderById(ctx context.Context, id int, dataUpdated *entitymodel.OrderUpdated) error {
	idTruckList, err := biz.store.CheckTrucksWithoutOrders(ctx)

	if err != nil {
		return err
	}

	order, err := biz.store.GetOrder(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	contains := false
	for _, truckID := range idTruckList {
		if truckID == int(dataUpdated.TruckId) {
			contains = true
			break
		}
	}

	if !contains {
		dataUpdated.Status = "OnGoing"
	}

	if err := biz.store.UpdateOrder(ctx, map[string]interface{}{"id": order.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

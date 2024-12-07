package biz

import (
	"context"

	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
)

type UpdateOrderStorage interface {
	GetOrder(ctx context.Context, cond map[string]interface{}) (*modelorder.Order, error)
	UpdateOrder(ctx context.Context, cond map[string]interface{}, dataUpdated *modelorder.OrderUpdated) error
}

type updateOrderBiz struct {
	store UpdateOrderStorage
}

func NewUpdateOrderBiz(store UpdateOrderStorage) *updateOrderBiz {
	return &updateOrderBiz{store: store}
}

func (biz *updateOrderBiz) UpdateOrderById(ctx context.Context, id int, dataUpdated *modelorder.OrderUpdated) error {
	order, err := biz.store.GetOrder(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateOrder(ctx, map[string]interface{}{"id": order.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

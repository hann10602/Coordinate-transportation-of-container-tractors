package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type DeleteOrderStorage interface {
	DeleteOrder(ctx context.Context, cond map[string]interface{}) error
	GetOrder(ctx context.Context, cond map[string]interface{}) (*entitymodel.Order, error)
	ImplementOrder(ctx context.Context, id int64) error
}

type deleteOrderBiz struct {
	store DeleteOrderStorage
}

func NewDeleteOrderBiz(store DeleteOrderStorage) *deleteOrderBiz {
	return &deleteOrderBiz{
		store: store,
	}
}

func (biz *deleteOrderBiz) DeleteOrderById(ctx context.Context, id int) error {
	if err := biz.store.DeleteOrder(ctx, map[string]interface{}{"id": id}); err != nil {
		return err
	}

	return nil
}

func (biz *deleteOrderBiz) GetOrderById(ctx context.Context, id int) (*entitymodel.Order, error) {
	order, err := biz.store.GetOrder(ctx, map[string]interface{}{"id": id})
	if err != nil {
		return nil, err
	}

	return order, nil
}

func (biz *deleteOrderBiz) ImplementOrder(ctx context.Context, id int64) error {
	if err := biz.store.ImplementOrder(ctx, id); err != nil {
		return err
	}

	return nil
}

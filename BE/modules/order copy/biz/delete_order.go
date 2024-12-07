package biz

import "context"

type DeleteOrderStorage interface {
	DeleteOrder(ctx context.Context, cond map[string]interface{}) error
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

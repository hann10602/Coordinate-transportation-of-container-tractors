package biz

import "context"

type DeleteTruckStorage interface {
	DeleteTruck(ctx context.Context, cond map[string]interface{}) error
}

type deleteTruckBiz struct {
	store DeleteTruckStorage
}

func NewDeleteTruckBiz(store DeleteTruckStorage) *deleteTruckBiz {
	return &deleteTruckBiz{
		store: store,
	}
}

func (biz *deleteTruckBiz) DeleteTruckById(ctx context.Context, id int) error {
	if err := biz.store.DeleteTruck(ctx, map[string]interface{}{"id": id}); err != nil {
		return err
	}

	return nil
}

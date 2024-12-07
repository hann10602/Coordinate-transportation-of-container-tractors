package biz

import (
	"context"

	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
)

type GetListOrderStorage interface {
	GetListOrder(ctx context.Context, filter modelorder.Filter) ([]modelorder.OrderGetList, error)
}

type getListOrderBiz struct {
	store GetListOrderStorage
}

func NewGetListOrderBiz(store GetListOrderStorage) *getListOrderBiz {
	return &getListOrderBiz{store: store}
}

func (biz *getListOrderBiz) FindListOrder(ctx context.Context, filter modelorder.Filter) ([]modelorder.OrderGetList, error) {
	data, err := biz.store.GetListOrder(ctx, filter)

	if err != nil {
		return nil, err
	}

	return data, nil
}

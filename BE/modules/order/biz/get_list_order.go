package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetListOrderStorage interface {
	GetListOrder(ctx context.Context, filter entitymodel.Filter) ([]entitymodel.OrderGetList, error)
}

type getListOrderBiz struct {
	store GetListOrderStorage
}

func NewGetListOrderBiz(store GetListOrderStorage) *getListOrderBiz {
	return &getListOrderBiz{store: store}
}

func (biz *getListOrderBiz) FindListOrder(ctx context.Context, filter entitymodel.Filter) ([]entitymodel.OrderGetList, error) {
	data, err := biz.store.GetListOrder(ctx, filter)

	if err != nil {
		return nil, err
	}

	return data, nil
}

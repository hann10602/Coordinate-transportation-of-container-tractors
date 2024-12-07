package biz

import (
	"context"

	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
)

type GetOrderStorage interface {
	GetOrder(ctx context.Context, cond map[string]interface{}) (*modelorder.Order, error)
}

type getOrderBiz struct {
	store GetOrderStorage
}

func NewGetOrderBiz(store GetOrderStorage) *getOrderBiz {
	return &getOrderBiz{store: store}
}

func (biz *getOrderBiz) GetOrderById(ctx context.Context, id int) (*modelorder.Order, error) {
	data, err := biz.store.GetOrder(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return nil, err
	}

	return data, nil
}

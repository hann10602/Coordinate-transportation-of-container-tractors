package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetOrderStorage interface {
	GetOrder(ctx context.Context, cond map[string]interface{}) (*entitymodel.Order, error)
	CountRoutingDistance(ctx context.Context, truckId int) (int64, error)
}

type getOrderBiz struct {
	store GetOrderStorage
}

func NewGetOrderBiz(store GetOrderStorage) *getOrderBiz {
	return &getOrderBiz{store: store}
}

func (biz *getOrderBiz) GetOrderById(ctx context.Context, id int) (*entitymodel.Order, error) {
	data, err := biz.store.GetOrder(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return nil, err
	}

	return data, nil
}

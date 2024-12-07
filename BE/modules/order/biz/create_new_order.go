package biz

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelorder "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/order"
)

type CreateOrderStorage interface {
	CreateOrder(ctx context.Context, data []*modelorder.OrderCreated) error
}

type createOrderBiz struct {
	store CreateOrderStorage
}

func NewCreateOrderBiz(store CreateOrderStorage) *createOrderBiz {
	return &createOrderBiz{store: store}
}

func (biz *createOrderBiz) CreateNewOrder(ctx context.Context, data []*modelorder.OrderCreated) error {
	for _, order := range data {
		title := strings.TrimSpace(order.Title)

		if title == "" {
			return common.ErrInvalidRequest(modelorder.ErrTitleIsEmpty)
		}
	}

	if err := biz.store.CreateOrder(ctx, data); err != nil {
		return err
	}

	return nil
}

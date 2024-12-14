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
		detailAddress := strings.TrimSpace(order.DetailAddress)
		note := strings.TrimSpace(order.Note)

		if detailAddress == "" {
			return common.ErrInvalidRequest(modelorder.ErrDetailAddressIsEmpty)
		}

		if note == "" {
			return common.ErrInvalidRequest(modelorder.ErrNoteIsEmpty)
		}
	}

	if err := biz.store.CreateOrder(ctx, data); err != nil {
		return err
	}

	return nil
}

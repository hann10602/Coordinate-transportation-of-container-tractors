package biz

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type CreateOrderStorage interface {
	CreateOrder(ctx context.Context, data []*entitymodel.OrderCreated) error
}

type createOrderBiz struct {
	store CreateOrderStorage
}

func NewCreateOrderBiz(store CreateOrderStorage) *createOrderBiz {
	return &createOrderBiz{store: store}
}

func (biz *createOrderBiz) CreateNewOrder(ctx context.Context, data []*entitymodel.OrderCreated) error {
	for _, order := range data {
		detailAddress := strings.TrimSpace(order.DetailAddress)
		note := strings.TrimSpace(order.Note)

		if detailAddress == "" {
			return common.ErrInvalidRequest(entitymodel.ErrDetailAddressIsEmpty)
		}

		if note == "" {
			return common.ErrInvalidRequest(entitymodel.ErrNoteIsEmpty)
		}
	}

	if err := biz.store.CreateOrder(ctx, data); err != nil {
		return err
	}

	return nil
}

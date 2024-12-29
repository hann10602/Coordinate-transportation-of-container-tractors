package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type UpdateNextStepOrderStorage interface {
	GetOrder(ctx context.Context, cond map[string]interface{}) (*entitymodel.Order, error)
	UpdateNextStepOrder(ctx context.Context, cond map[string]interface{}, dataUpdated *entitymodel.OrderUpdated) error
}

type updateNextStepOrderBiz struct {
	store UpdateNextStepOrderStorage
}

func NewUpdateNextStepOrderBiz(store UpdateNextStepOrderStorage) *updateNextStepOrderBiz {
	return &updateNextStepOrderBiz{store: store}
}

func (biz *updateNextStepOrderBiz) UpdateNextStepOrderById(ctx context.Context, id int, dataUpdated *entitymodel.OrderUpdated) error {
	order, err := biz.store.GetOrder(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateNextStepOrder(ctx, map[string]interface{}{"id": order.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

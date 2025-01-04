package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type UpdateNextStepOrderStorage interface {
	GetOrder(ctx context.Context, cond map[string]interface{}) (*entitymodel.Order, error)
	UpdateNextStepOrder(ctx context.Context, cond map[string]interface{}, dataUpdated *entitymodel.OrderUpdated) error
	ImplementOrder(ctx context.Context, id int64) error
	ChangeBetweenOrder(ctx context.Context, truckId int64, cond map[string]interface{}, dataUpdated *entitymodel.OrderUpdated) error
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

func (biz *updateNextStepOrderBiz) ImplementOrder(ctx context.Context, id int64) error {
	if err := biz.store.ImplementOrder(ctx, id); err != nil {
		return err
	}

	return nil
}

func (biz *updateNextStepOrderBiz) ChangeBetweenOrder(ctx context.Context, truckId int64, currentOrderId int, dataUpdated *entitymodel.OrderUpdated) error {
	if err := biz.store.ChangeBetweenOrder(ctx, truckId, map[string]interface{}{"id": currentOrderId}, dataUpdated); err != nil {
		return err
	}

	return nil
}

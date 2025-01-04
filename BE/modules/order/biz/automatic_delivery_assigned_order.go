package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type AutomaticDeliveryAssignedOrderStorage interface {
	AutomaticDeliveryAssignedOrder(ctx context.Context, orderList []entitymodel.OrderId, idList []entitymodel.TruckId) error
	FindOrderWithoutAssigned(ctx context.Context) ([]entitymodel.OrderId, error)
	TruckList(ctx context.Context) ([]entitymodel.TruckId, error)
	CheckTrucksWithoutOrders(ctx context.Context) ([]int, error)
	ImplementOrder(ctx context.Context, id int64) error
}

type automaticDeliveryAssignedOrderBiz struct {
	store AutomaticDeliveryAssignedOrderStorage
}

func NewAutomaticDeliveryAssignedOrderBiz(store AutomaticDeliveryAssignedOrderStorage) *automaticDeliveryAssignedOrderBiz {
	return &automaticDeliveryAssignedOrderBiz{store: store}
}

func (biz *automaticDeliveryAssignedOrderBiz) AutomaticDeliveryAssignedOrder(ctx context.Context, orderList []entitymodel.OrderId, idList []entitymodel.TruckId) error {
	if err := biz.store.AutomaticDeliveryAssignedOrder(ctx, orderList, idList); err != nil {
		return err
	}

	return nil
}

func (biz *automaticDeliveryAssignedOrderBiz) FindOrderWithoutAssigned(ctx context.Context) ([]entitymodel.OrderId, error) {
	data, err := biz.store.FindOrderWithoutAssigned(ctx)

	if err != nil {
		return nil, err
	}

	return data, nil
}

func (biz *automaticDeliveryAssignedOrderBiz) TruckList(ctx context.Context) ([]entitymodel.TruckId, error) {
	idList, err := biz.store.TruckList(ctx)

	if err != nil {
		return nil, err
	}

	return idList, nil
}

func (biz *automaticDeliveryAssignedOrderBiz) CheckTrucksWithoutOrders(ctx context.Context) ([]int, error) {
	data, err := biz.store.CheckTrucksWithoutOrders(ctx)

	if err != nil {
		return nil, err
	}

	return data, nil
}

func (biz *automaticDeliveryAssignedOrderBiz) ImplementOrder(ctx context.Context, id int64) error {
	if err := biz.store.ImplementOrder(ctx, id); err != nil {
		return err
	}

	return nil
}

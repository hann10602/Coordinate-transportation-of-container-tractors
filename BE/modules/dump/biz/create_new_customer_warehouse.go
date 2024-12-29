package biz

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type CreateCustomerWarehouseStorage interface {
	CreateCustomerWarehouse(ctx context.Context, data []*entitymodel.CustomerWarehouseCreated) error
}

type createCustomerWarehouseBiz struct {
	store CreateCustomerWarehouseStorage
}

func NewCreateCustomerWarehouseBiz(store CreateCustomerWarehouseStorage) *createCustomerWarehouseBiz {
	return &createCustomerWarehouseBiz{store: store}
}

func (biz *createCustomerWarehouseBiz) CreateNewCustomerWarehouse(ctx context.Context, data []*entitymodel.CustomerWarehouseCreated) error {
	for _, dump := range data {
		title := strings.TrimSpace(dump.Title)

		if title == "" {
			return common.ErrInvalidRequest(entitymodel.ErrTitleIsEmpty)
		}

		err := ValidateDecimal(dump.Latitude, 19, 17)
		if err != nil {
			return common.ErrInvalidRequest(err)
		}

		err = ValidateDecimal(dump.Longitude, 20, 17)
		if err != nil {
			return common.ErrInvalidRequest(err)
		}
	}

	if err := biz.store.CreateCustomerWarehouse(ctx, data); err != nil {
		return err
	}

	return nil
}

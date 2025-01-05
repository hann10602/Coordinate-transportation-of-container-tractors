package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type CreateAdvisoryStorage interface {
	CreateAdvisory(ctx context.Context, data *entitymodel.AdvisoryCreated) error
}

type createAdvisoryBiz struct {
	store CreateAdvisoryStorage
}

func NewCreateAdvisoryBiz(store CreateAdvisoryStorage) *createAdvisoryBiz {
	return &createAdvisoryBiz{store: store}
}

func (biz *createAdvisoryBiz) CreateNewAdvisory(ctx context.Context, data *entitymodel.AdvisoryCreated) error {
	if err := biz.store.CreateAdvisory(ctx, data); err != nil {
		return err
	}

	return nil
}

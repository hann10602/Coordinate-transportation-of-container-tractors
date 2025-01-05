package biz

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetListAdvisoryStorage interface {
	GetListAdvisory(ctx context.Context, paging common.Paging) ([]entitymodel.Advisory, common.Paging, error)
}

type getListAdvisoryBiz struct {
	store GetListAdvisoryStorage
}

func NewGetListAdvisoryBiz(store GetListAdvisoryStorage) *getListAdvisoryBiz {
	return &getListAdvisoryBiz{store: store}
}

func (biz *getListAdvisoryBiz) FindListAdvisory(ctx context.Context, paging common.Paging) ([]entitymodel.Advisory, common.Paging, error) {
	data, paging, err := biz.store.GetListAdvisory(ctx, paging)

	if err != nil {
		return nil, paging, err
	}

	return data, paging, nil
}

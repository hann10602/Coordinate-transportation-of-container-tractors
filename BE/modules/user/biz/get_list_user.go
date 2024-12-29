package biz

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetListUserStorage interface {
	GetListUser(ctx context.Context, paging common.Paging) ([]entitymodel.User, common.Paging, error)
}

type getListUserBiz struct {
	store GetListUserStorage
}

func NewGetListUserBiz(store GetListUserStorage) *getListUserBiz {
	return &getListUserBiz{store: store}
}

func (biz *getListUserBiz) FindListUser(ctx context.Context, paging common.Paging) ([]entitymodel.User, common.Paging, error) {
	data, paging, err := biz.store.GetListUser(ctx, paging)

	if err != nil {
		return nil, paging, err
	}

	return data, paging, nil
}

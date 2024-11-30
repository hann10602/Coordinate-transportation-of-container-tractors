package biz

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
)

type GetListDumpStorage interface {
	GetListDump(ctx context.Context, paging common.Paging) ([]modeldump.Dump, common.Paging, error)
}

type getListDumpBiz struct {
	store GetListDumpStorage
}

func NewGetListDumpBiz(store GetListDumpStorage) *getListDumpBiz {
	return &getListDumpBiz{store: store}
}

func (biz *getListDumpBiz) FindListDump(ctx context.Context, paging common.Paging) ([]modeldump.Dump, common.Paging, error) {
	data, paging, err := biz.store.GetListDump(ctx, paging)

	if err != nil {
		return nil, paging, err
	}

	return data, paging, nil
}

package biz

import (
	"context"

	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
)

type GetListDumpStorage interface {
	GetListDump(ctx context.Context, filter modeldump.Filter) ([]modeldump.DumpGetList, error)
}

type getListDumpBiz struct {
	store GetListDumpStorage
}

func NewGetListDumpBiz(store GetListDumpStorage) *getListDumpBiz {
	return &getListDumpBiz{store: store}
}

func (biz *getListDumpBiz) FindListDump(ctx context.Context, filter modeldump.Filter) ([]modeldump.DumpGetList, error) {
	data, err := biz.store.GetListDump(ctx, filter)

	if err != nil {
		return nil, err
	}

	return data, nil
}

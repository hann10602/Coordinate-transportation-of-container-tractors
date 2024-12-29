package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetDumpStorage interface {
	GetDump(ctx context.Context, cond map[string]interface{}) (*entitymodel.Dump, error)
}

type getDumpBiz struct {
	store GetDumpStorage
}

func NewGetDumpBiz(store GetDumpStorage) *getDumpBiz {
	return &getDumpBiz{store: store}
}

func (biz *getDumpBiz) GetDumpById(ctx context.Context, id int) (*entitymodel.Dump, error) {
	data, err := biz.store.GetDump(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return nil, err
	}

	return data, nil
}

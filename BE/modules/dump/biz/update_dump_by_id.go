package biz

import (
	"context"

	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
)

type UpdateDumpStorage interface {
	GetDump(ctx context.Context, cond map[string]interface{}) (*modeldump.Dump, error)
	UpdateDump(ctx context.Context, cond map[string]interface{}, dataUpdated *modeldump.DumpUpdated) error
}

type updateDumpBiz struct {
	store UpdateDumpStorage
}

func NewUpdateDumpBiz(store UpdateDumpStorage) *updateDumpBiz {
	return &updateDumpBiz{store: store}
}

func (biz *updateDumpBiz) UpdateDumpById(ctx context.Context, id int, dataUpdated *modeldump.DumpUpdated) error {
	dump, err := biz.store.GetDump(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateDump(ctx, map[string]interface{}{"id": dump.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

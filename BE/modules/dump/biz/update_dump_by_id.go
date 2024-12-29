package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type UpdateDumpStorage interface {
	GetDump(ctx context.Context, cond map[string]interface{}) (*entitymodel.Dump, error)
	UpdateDump(ctx context.Context, cond map[string]interface{}, dataUpdated *entitymodel.DumpUpdated) error
}

type updateDumpBiz struct {
	store UpdateDumpStorage
}

func NewUpdateDumpBiz(store UpdateDumpStorage) *updateDumpBiz {
	return &updateDumpBiz{store: store}
}

func (biz *updateDumpBiz) UpdateDumpById(ctx context.Context, id int, dataUpdated *entitymodel.DumpUpdated) error {
	dump, err := biz.store.GetDump(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateDump(ctx, map[string]interface{}{"id": dump.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

package biz

import "context"

type DeleteDumpStorage interface {
	DeleteDump(ctx context.Context, cond map[string]interface{}) error
}

type deleteDumpBiz struct {
	store DeleteDumpStorage
}

func NewDeleteDumpBiz(store DeleteDumpStorage) *deleteDumpBiz {
	return &deleteDumpBiz{
		store: store,
	}
}

func (biz *deleteDumpBiz) DeleteDumpById(ctx context.Context, id int) error {
	if err := biz.store.DeleteDump(ctx, map[string]interface{}{"id": id}); err != nil {
		return err
	}

	return nil
}

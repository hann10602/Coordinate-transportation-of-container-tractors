package biz

import "context"

type DeleteAdvisoryStorage interface {
	DeleteAdvisory(ctx context.Context, cond map[string]interface{}) error
}

type deleteAdvisoryBiz struct {
	store DeleteAdvisoryStorage
}

func NewDeleteAdvisoryBiz(store DeleteAdvisoryStorage) *deleteAdvisoryBiz {
	return &deleteAdvisoryBiz{
		store: store,
	}
}

func (biz *deleteAdvisoryBiz) DeleteAdvisoryById(ctx context.Context, id int) error {
	if err := biz.store.DeleteAdvisory(ctx, map[string]interface{}{"id": id}); err != nil {
		return err
	}

	return nil
}

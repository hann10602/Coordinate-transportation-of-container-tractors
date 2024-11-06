package biz

import "context"

type DeleteUserStorage interface {
	DeleteUser(ctx context.Context, cond map[string]interface{}) error
}

type deleteUserBiz struct {
	store DeleteUserStorage
}

func NewDeleteUserBiz(store DeleteUserStorage) *deleteUserBiz {
	return &deleteUserBiz{
		store: store,
	}
}

func (biz *deleteUserBiz) DeleteUserById(ctx context.Context, id int) error {
	if err := biz.store.DeleteUser(ctx, map[string]interface{}{"id": id}); err != nil {
		return err
	}

	return nil
}

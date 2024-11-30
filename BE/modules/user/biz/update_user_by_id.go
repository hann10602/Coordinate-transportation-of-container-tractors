package biz

import (
	"context"

	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
)

type UpdateUserStorage interface {
	GetUser(ctx context.Context, cond map[string]interface{}) (*modeluser.User, error)
	UpdateUser(ctx context.Context, cond map[string]interface{}, dataUpdated *modeluser.UserUpdated) error
}

type updateUserBiz struct {
	store UpdateUserStorage
}

func NewUpdateUserBiz(store UpdateUserStorage) *updateUserBiz {
	return &updateUserBiz{store: store}
}

func (biz *updateUserBiz) UpdateUserById(ctx context.Context, id int, dataUpdated *modeluser.UserUpdated) error {
	user, err := biz.store.GetUser(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateUser(ctx, map[string]interface{}{"id": user.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

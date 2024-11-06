package biz

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type UpdateUserStorage interface {
	GetUser(ctx context.Context, cond map[string]interface{}) (*model.TUser, error)
	UpdateUser(ctx context.Context, cond map[string]interface{}, dataUpdated *model.TUserUpdated) error
}

type updateUserBiz struct {
	store UpdateUserStorage
}

func NewUpdateUserBiz(store UpdateUserStorage) *updateUserBiz {
	return &updateUserBiz{store: store}
}

func (biz *updateUserBiz) UpdateUserById(ctx context.Context, id int, dataUpdated *model.TUserUpdated) error {
	user, err := biz.store.GetUser(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateUser(ctx, map[string]interface{}{"id": user.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

package biz

import (
	"context"

	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type UpdateUserStorage interface {
	GetUser(ctx context.Context, cond map[string]interface{}) (*entitymodel.User, error)
	UpdateUser(ctx context.Context, cond map[string]interface{}, dataUpdated *entitymodel.UserUpdated) error
}

type updateUserBiz struct {
	store UpdateUserStorage
}

func NewUpdateUserBiz(store UpdateUserStorage) *updateUserBiz {
	return &updateUserBiz{store: store}
}

func (biz *updateUserBiz) UpdateUserById(ctx context.Context, id int, dataUpdated *entitymodel.UserUpdated) error {
	user, err := biz.store.GetUser(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateUser(ctx, map[string]interface{}{"id": user.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

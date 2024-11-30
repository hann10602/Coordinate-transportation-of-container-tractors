package biz

import (
	"context"

	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
)

type GetUserStorage interface {
	GetUser(ctx context.Context, cond map[string]interface{}) (*modeluser.User, error)
}

type getUserBiz struct {
	store GetUserStorage
}

func NewGetUserBiz(store GetUserStorage) *getUserBiz {
	return &getUserBiz{store: store}
}

func (biz *getUserBiz) GetUserById(ctx context.Context, id int) (*modeluser.User, error) {
	data, err := biz.store.GetUser(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return nil, err
	}

	return data, nil
}

package biz

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetUserStorage interface {
	GetUser(ctx context.Context, cond map[string]interface{}) (*model.TUser, error)
}

type getUserBiz struct {
	store GetUserStorage
}

func NewGetUserBiz(store GetUserStorage) *getUserBiz {
	return &getUserBiz{store: store}
}

func (biz *getUserBiz) GetUserById(ctx context.Context, id int) (*model.TUser, error) {
	data, err := biz.store.GetUser(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return nil, err
	}

	return data, nil
}

package biz

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type CreateUserStorage interface {
	CreateUser(ctx context.Context, data *model.TUserCreated) error
}

type createUserBiz struct {
	store CreateUserStorage
}

func NewCreateUserBiz(store CreateUserStorage) *createUserBiz {
	return &createUserBiz{store: store}
}

func (biz *createUserBiz) CreateNewUser(ctx context.Context, data *model.TUserCreated) error {
	username := strings.TrimSpace(data.Username)
	password := strings.TrimSpace(data.Password)
	phoneNumber := strings.TrimSpace(data.PhoneNumber)

	if username == "" {
		return common.ErrInvalidRequest(model.ErrFullNameIsEmpty)
	}

	if password == "" {
		return common.ErrInvalidRequest(model.ErrUsernameIsEmpty)
	}

	if phoneNumber == "" {
		return common.ErrInvalidRequest(model.ErrPasswordIsEmpty)
	}

	if err := biz.store.CreateUser(ctx, data); err != nil {
		return err
	}

	return nil
}

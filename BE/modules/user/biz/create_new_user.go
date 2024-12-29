package biz

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type CreateUserStorage interface {
	CreateUser(ctx context.Context, data *entitymodel.UserCreated) error
}

type createUserBiz struct {
	store CreateUserStorage
}

func NewCreateUserBiz(store CreateUserStorage) *createUserBiz {
	return &createUserBiz{store: store}
}

func (biz *createUserBiz) CreateNewUser(ctx context.Context, data *entitymodel.UserCreated) error {
	username := strings.TrimSpace(data.Username)
	password := strings.TrimSpace(data.Password)
	phoneNumber := strings.TrimSpace(data.PhoneNumber)

	if username == "" {
		return common.ErrInvalidRequest(entitymodel.ErrFullNameIsEmpty)
	}

	if password == "" {
		return common.ErrInvalidRequest(entitymodel.ErrUsernameIsEmpty)
	}

	if phoneNumber == "" {
		return common.ErrInvalidRequest(entitymodel.ErrPasswordIsEmpty)
	}

	if err := biz.store.CreateUser(ctx, data); err != nil {
		return err
	}

	return nil
}

package biz

import (
	"context"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
)

type GetUserStorage interface {
	GetUserByUsernameAndPassword(ctx context.Context, loginParams entitymodel.Login) (*entitymodel.User, error)
}

type getUserBiz struct {
	store GetUserStorage
}

func NewLoginBiz(store GetUserStorage) *getUserBiz {
	return &getUserBiz{store: store}
}

func (biz *getUserBiz) GetUserByUsernameAndPassword(ctx context.Context, loginParams entitymodel.Login) (string, error) {
	data, err := biz.store.GetUserByUsernameAndPassword(ctx, loginParams)

	if err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": data.Id,
		"name":   data.FullName,
		"role":   data.Role,
		"ttl":    time.Now().Add(time.Hour * 24 * 100).Unix(),
	})

	hmacSampleSecret := []byte("STRIPE_HMAC_SECRET")

	tokenString, err := token.SignedString(hmacSampleSecret)

	if err != nil {
		fmt.Println(err)
		return "", common.ErrInvalidRequest(entitymodel.ErrJWTCreationFailed)
	}

	return tokenString, nil
}

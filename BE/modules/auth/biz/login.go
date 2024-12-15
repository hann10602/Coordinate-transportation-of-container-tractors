package biz

import (
	"context"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modelauth "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/auth"
	modeluser "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/user"
)

type GetUserStorage interface {
	GetUserByUsernameAndPassword(ctx context.Context, loginParams modelauth.Login) (*modeluser.User, error)
}

type getUserBiz struct {
	store GetUserStorage
}

func NewLoginBiz(store GetUserStorage) *getUserBiz {
	return &getUserBiz{store: store}
}

func (biz *getUserBiz) GetUserByUsernameAndPassword(ctx context.Context, loginParams modelauth.Login) (string, error) {
	data, err := biz.store.GetUserByUsernameAndPassword(ctx, loginParams)

	if err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": data.Id,
		"ttl":    time.Now().Add(time.Hour * 24 * 100).Unix(),
	})
	hmacSampleSecret := []byte("STRIPE_HMAC_SECRET")

	tokenString, err := token.SignedString(hmacSampleSecret)

	if err != nil {
		fmt.Println(err)
		return "", common.ErrInvalidRequest(modelauth.ErrJWTCreationFailed)
	}

	return tokenString, nil
}

package biz

import (
	"context"
	"strings"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
	"github.com/shopspring/decimal"
)

type CreateDumpStorage interface {
	CreateDump(ctx context.Context, data []*modeldump.DumpCreated) error
}

type createDumpBiz struct {
	store CreateDumpStorage
}

func NewCreateDumpBiz(store CreateDumpStorage) *createDumpBiz {
	return &createDumpBiz{store: store}
}

func ValidateDecimal(value decimal.Decimal, precision, scale int) error {
	valueString := value.String()

	var integerPart, fractionalPart string

	for i, ch := range valueString {
		if ch == '.' {
			integerPart = valueString[:i]
			fractionalPart = valueString[i+1:]

			break
		}
	}

	if integerPart == "" || fractionalPart == "" {
		integerPart = valueString
	}

	totalDigits := len(integerPart) + len(fractionalPart)
	if totalDigits > precision {
		return modeldump.ErrValueExceedsPrecision
	}

	if len(fractionalPart) > scale {
		return modeldump.ErrValueExceedsScale
	}

	return nil
}

func (biz *createDumpBiz) CreateNewDump(ctx context.Context, data []*modeldump.DumpCreated) error {
	for _, dump := range data {
		title := strings.TrimSpace(dump.Title)

		if title == "" {
			return common.ErrInvalidRequest(modeldump.ErrTitleIsEmpty)
		}

		err := ValidateDecimal(dump.Latitude, 8, 6)
		if err != nil {
			return common.ErrInvalidRequest(err)
		}

		err = ValidateDecimal(dump.Longitude, 9, 6)
		if err != nil {
			return common.ErrInvalidRequest(err)
		}
	}

	if err := biz.store.CreateDump(ctx, data); err != nil {
		return err
	}

	return nil
}
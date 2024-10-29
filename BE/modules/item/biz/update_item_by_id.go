package biz

import (
	"context"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/modules/item/model"
)

type UpdateItemStorage interface {
	GetItem(ctx context.Context, cond map[string]interface{}) (*model.TodoItem, error)
	UpdateItem(ctx context.Context, cond map[string]interface{}, dataUpdated *model.TodoItemUpdated) error
}

type updateItemBiz struct {
	store UpdateItemStorage
}

func NewUpdateItemBiz(store UpdateItemStorage) *updateItemBiz {
	return &updateItemBiz{store: store}
}

func (biz *updateItemBiz) UpdateItemById(ctx context.Context, id int, dataUpdated *model.TodoItemUpdated) error {
	item, err := biz.store.GetItem(ctx, map[string]interface{}{"id": id})

	if err != nil {
		return err
	}

	if err := biz.store.UpdateItem(ctx, map[string]interface{}{"id": item.Id}, dataUpdated); err != nil {
		return err
	}

	return nil
}

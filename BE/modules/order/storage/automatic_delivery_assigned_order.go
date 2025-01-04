package storage

import (
	"context"
	"fmt"

	"github.com/hann10602/Coordinate-transportation-of-container-tractors/common"
	entitymodel "github.com/hann10602/Coordinate-transportation-of-container-tractors/model"
	"gorm.io/gorm"
)

func (s *sqlStore) AutomaticDeliveryAssignedOrder(ctx context.Context, orderList []entitymodel.OrderId, idList []entitymodel.TruckId) error {
	orderIds := make([]int64, len(orderList))

	if len(orderIds) == 0 {
		return common.ErrInvalidRequest(entitymodel.ErrAllOrdersAreAssigned)
	}

	for i, order := range orderList {
		orderIds[i] = order.Id
	}

	if err := s.db.Model(&entitymodel.Order{}).Where("id IN ?", orderIds).Updates(map[string]interface{}{
		"status":   "Waiting",
		"truck_id": gorm.Expr("CASE id " + buildCaseStatement(orderList, idList) + " END"),
	}).Error; err != nil {
		return common.ErrDB(err)
	}

	return nil
}

func buildCaseStatement(orderList []entitymodel.OrderId, idList []entitymodel.TruckId) string {
	caseStatement := ""
	truckQuantity := len(idList)
	for index, order := range orderList {
		truckId := idList[index%int(truckQuantity)].Id
		caseStatement += fmt.Sprintf("WHEN %d THEN %d ", order.Id, truckId)
	}

	return caseStatement
}

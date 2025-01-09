package entitymodel

type TPaymentIntent struct {
	Amount int64 `json:"amount"`
}

type TPaymentCheckout struct {
	Type                string `json:"type"`
	DeliveryDate        string `json:"deliveryDate"`
	DetailAddress       string `json:"detailAddress"`
	Note                string `json:"note"`
	UserId              string `json:"userId"`
	PortId              string `json:"portId"`
	CustomerWarehouseId string `json:"customerWarehouseId"`
	StartTrailerId      string `json:"startTrailerId"`
	EndTrailerId        string `json:"endTrailerId"`
	ContainerId         string `json:"containerId"`
	TotalPrice          string `json:"totalPrice"`
	Distance            string `json:"Distance"`
	DeliveryType        string `json:"deliveryType"`
}

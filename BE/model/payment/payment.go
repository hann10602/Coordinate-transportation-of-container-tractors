package modelpayment

type TPaymentIntent struct {
	Amount int64 `json:"amount"`
}

type TPaymentCheckout struct {
	Price        int64  `json:"price"`
	DeliveryType string `json:"delivery-type"`
}

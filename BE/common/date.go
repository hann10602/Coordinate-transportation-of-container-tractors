package common

import (
	"fmt"
	"time"
)

type CustomDate struct {
	time.Time
}

const (
	DateFormat = "2006-01-02"
)

func (cd *CustomDate) UnmarshalJSON(b []byte) error {
	str := string(b)
	str = str[1 : len(str)-1]

	parsedTime, err := time.Parse(DateFormat, str)
	if err != nil {
		return fmt.Errorf("invalid date format: %v", err)
	}

	cd.Time = parsedTime
	return nil
}

func (cd CustomDate) MarshalJSON() ([]byte, error) {
	formatted := fmt.Sprintf("\"%s\"", cd.Time.Format(DateFormat))
	return []byte(formatted), nil
}

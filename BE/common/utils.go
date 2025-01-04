package common

func Contains(slice []int, item int64) bool {
	for _, v := range slice {
		if int64(v) == item {
			return true
		}
	}
	return false
}

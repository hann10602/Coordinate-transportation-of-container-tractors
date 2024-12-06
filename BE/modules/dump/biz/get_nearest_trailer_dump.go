package biz

import (
	"context"
	"math"

	modeldump "github.com/hann10602/Coordinate-transportation-of-container-tractors/model/dump"
)

type GetNearestTrailerDumpStorage interface {
	GetListDump(ctx context.Context, filter modeldump.Filter) ([]modeldump.DumpGetList, error)
}

type getNearestTrailerDumpBiz struct {
	store GetNearestTrailerDumpStorage
}

func NewGetNearestTrailerDumpBiz(store GetNearestTrailerDumpStorage) *getNearestTrailerDumpBiz {
	return &getNearestTrailerDumpBiz{store: store}
}

func (biz *getNearestTrailerDumpBiz) FindNearestTrailerDump(ctx context.Context, latLong modeldump.DumpGetNearestTrailer) (*modeldump.DumpGetList, error) {
	var filter modeldump.Filter

	filter.Type = "Trailer"

	data, err := biz.store.GetListDump(ctx, filter)

	if err != nil {
		return nil, err
	}

	nearestTrailer := FindNearestPoint(latLong, data)

	return nearestTrailer, nil
}

func haversineDistance(p1 modeldump.DumpGetNearestTrailer, p2 *modeldump.DumpGetList) float64 {
	const earthRadius = 6371 // Earth's radius in kilometers
	lat1, lon1 := DegreesToRadians(p1.Latitude), DegreesToRadians(p1.Longitude)
	lat2, lon2 := DegreesToRadians(p2.Latitude), DegreesToRadians(p2.Longitude)

	dLat := lat2 - lat1
	dLon := lon2 - lon1

	a := math.Sin(dLat/2)*math.Sin(dLat/2) +
		math.Cos(lat1)*math.Cos(lat2)*math.Sin(dLon/2)*math.Sin(dLon/2)

	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))
	return earthRadius * c
}

// degreesToRadians converts degrees to radians
func DegreesToRadians(degrees float64) float64 {
	return degrees * math.Pi / 180
}

// findNearestPoint finds the nearest point to a given target point from a list of points
func FindNearestPoint(target modeldump.DumpGetNearestTrailer, trailers []modeldump.DumpGetList) *modeldump.DumpGetList {
	if len(trailers) == 0 {
		panic("Trailer list cannot be empty")
	}

	nearest := &trailers[0]
	minDistance := haversineDistance(target, nearest)

	for _, trailer := range trailers[1:] {
		distance := haversineDistance(target, &trailer)
		if distance < minDistance {
			minDistance = distance
			nearest = &trailer
		}
	}

	return nearest
}

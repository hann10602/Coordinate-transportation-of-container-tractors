import { createControlComponent } from '@react-leaflet/core';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';
import { MapContainer, TileLayer } from 'react-leaflet';

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    waypoints: props.waypoints,
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }]
    }
  });

  instance.on('routesfound', function (e) {
    if (props.setDistance) {
      var routes = e.routes;
      var summary = routes[0].summary;

      props.setDistance(summary.totalDistance / 1000);
    }
  });

  instance.on('routeselected', function (e) {
    if (props.currentDestination) {
      const map = instance._map;
      const truckWaypoints = e.route.waypoints;
      if (truckWaypoints.length > 0) {
        addTruckMarker(map, props.currentDestination);
      }
      const waypoints = e.route.waypoints;
      if (waypoints.length > 1) {
        addOrangeWaypointMarker(map, waypoints[props.nextPoint].latLng);
      }
    }
  });

  return instance;
};

const createTruckIcon = () => {
  return L.icon({
    iconUrl: '/public/images/truck.png',
    iconSize: [60, 60], // size of the icon
    iconAnchor: [30, 0], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
  });
};

const addTruckMarker = (map, latlng) => {
  const truckIcon = createTruckIcon();
  L.marker(latlng, { icon: truckIcon }).addTo(map);
};

const createOrangeWaypointIcon = () => {
  return L.icon({
    iconUrl: '/public/images/orange-waypoint-icon.jpg',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
    className: 'orange-waypoint-icon' // add a custom class to the icon
  });
};

const addOrangeWaypointMarker = (map, latlng) => {
  const orangeWaypointIcon = createOrangeWaypointIcon();
  const marker = L.marker(latlng, { icon: orangeWaypointIcon }).addTo(map);
  marker.setZIndexOffset(1000);
};

// Takes only 1 argument:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export const RoutineMachineMap = ({
  routingList,
  setDistance,
  currentDestination,
  nextPoint
}: {
  routingList: LatLngExpression[];
  setDistance?: React.Dispatch<React.SetStateAction<number>>;
  currentDestination?: LatLngExpression;
  nextPoint?: number;
}) => {
  return (
    <MapContainer
      center={currentDestination ? currentDestination : routingList[0] && routingList[0]}
      zoom={5}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine
        waypoints={routingList}
        setDistance={setDistance}
        currentDestination={currentDestination}
        nextPoint={nextPoint}
      />
    </MapContainer>
  );
};

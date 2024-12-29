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
      const waypoints = e.route.waypoints;
      if (waypoints.length > 0) {
        addTruckMarker(map, props.currentDestination);
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

// Takes only 1 argument:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export const RoutineMachineMap = ({
  routingList,
  setDistance,
  currentDestination
}: {
  routingList: LatLngExpression[];
  setDistance?: React.Dispatch<React.SetStateAction<number>>;
  currentDestination?: LatLngExpression;
}) => {
  return (
    <MapContainer
      center={currentDestination ? currentDestination : routingList[0] && routingList[0]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine waypoints={routingList} setDistance={setDistance} currentDestination={currentDestination} />
    </MapContainer>
  );
};

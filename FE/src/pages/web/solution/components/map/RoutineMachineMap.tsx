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
    var routes = e.routes;
    var summary = routes[0].summary;

    props.setDistance(summary.totalDistance / 1000);
  });

  return instance;
};

// Takes only 1 argument:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export const RoutineMachineMap = ({
  routingList,
  setDistance
}: {
  routingList: LatLngExpression[];
  setDistance: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <MapContainer center={routingList[0] && routingList[0]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingMachine waypoints={routingList} setDistance={setDistance} />
    </MapContainer>
  );
};

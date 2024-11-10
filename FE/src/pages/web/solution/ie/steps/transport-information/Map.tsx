import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

function MyComponent() {
  const [currentLocation, setCurrentLocation] = useState<LatLngExpression>([20.96193312256204, 105.76609500340967]);

  const map = useMapEvents({
    locationfound: (location) => {
      setCurrentLocation(location.latlng);
    }
  });

  useEffect(() => {
    map.locate();
    map.setView(currentLocation);
  }, [currentLocation]);

  return null;
}

export const Map = () => {
  return (
    <MapContainer center={[20.96193312256204, 105.76609500340967]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>This is a custom marker popup</Popup>
      </Marker>
      <MyComponent />
    </MapContainer>
  );
};

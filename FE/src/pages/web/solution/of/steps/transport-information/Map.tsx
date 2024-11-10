import { MapContainer, Polyline, Popup, TileLayer, useMapEvent } from 'react-leaflet';
import CustomMarker from './CustomMarker';

function MyComponent() {
  const map = useMapEvent('click', () => {
    map.setView([50.5, 30.5], map.getZoom());
  });
  return null;
}

export const Map = () => {
  const limeOptions = { color: 'lime' };
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CustomMarker position={[51.505, -0.09]}>
        <Popup>This is a custom marker popup</Popup>
      </CustomMarker>
      <Polyline
        pathOptions={limeOptions}
        positions={[
          [51.505, -0.09],
          [51.51, -0.1],
          [59.51, -0.13]
        ]}
      />
      <MyComponent />
    </MapContainer>
  );
};

import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

function MyComponent({ setMarkerPosition }: { setMarkerPosition: (e: LatLngExpression) => void }) {
  const map = useMapEvents({
    click: (e) => {
      setMarkerPosition(e.latlng);
    },
    locationfound: (location) => {
      map.setView(location.latlng);
      setMarkerPosition(location.latlng);
    }
  });

  return null;
}

export const Map = ({
  Location,
  setLocation
}: {
  Location: LatLngExpression | undefined;
  setLocation: (e: LatLngExpression) => void;
}) => {
  return (
    <MapContainer
      style={{ height: '440px' }}
      center={[20.96193312256204, 105.76609500340967]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Location && (
        <Marker position={Location}>
          <Popup>This is a custom marker popup</Popup>
        </Marker>
      )}
      <MyComponent setMarkerPosition={setLocation} />
    </MapContainer>
  );
};

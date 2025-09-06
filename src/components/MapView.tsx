import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: { lat: number; lng: number };
}

interface MapViewProps {
  issues: Issue[];
}

const MapView = ({ issues }: MapViewProps) => {
  const center: LatLngExpression = [23.6, 58.5]; // Default center (Oman)

  return (
    <div className="h-[500px] w-full rounded shadow-md overflow-hidden">
      <MapContainer center={center} zoom={6} scrollWheelZoom={true} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {issues.map(issue => (
          <Marker key={issue.id} position={[issue.location.lat, issue.location.lng]}>
            <Popup>
              <strong>{issue.title}</strong><br />
              {issue.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

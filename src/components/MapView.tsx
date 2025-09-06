import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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

const ResizeFix = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);
  return null;
};

const MapView = ({ issues }: MapViewProps) => {
  const center: LatLngExpression = [23.6, 58.5]; // Default center (Oman)

  return (
    <div className="relative w-full h-[500px] rounded shadow-md overflow-hidden">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        className="absolute inset-0 z-0"
      >
        <ResizeFix />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {issues.map(issue => (
          <Marker
            key={issue.id}
            position={[issue.location.lat, issue.location.lng]}
          >
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

import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../supabaseClient';

// Custom marker icon setup
import markerIcon from '/icons/marker-icon.png';
import markerIcon2x from '/icons/marker-icon-2x.png';
import markerShadow from '/icons/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Types
interface Issue {
  id: string;
  title: string;
  description: string;
  location: { lat: number; lng: number };
  timestamp?: string;
  upvotes: number;
  downvotes?: number;
}

interface MapViewProps {
  issues?: Issue[]; // Optional prop
}

const MapView = ({ issues = [] }: MapViewProps) => {
  const center: LatLngExpression = [23.6, 58.5]; // Default center (Oman)
  const [mapIssues, setMapIssues] = useState<Issue[]>([]);
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch popular map-submitted issues
  useEffect(() => {
    const fetchMapIssues = async () => {
      const { data, error } = await supabase
        .from('map_issues')
        .select('*')
        .gt('upvotes', 5);

      if (error) {
        console.error('❌ Error fetching map_issues:', error.message);
      } else {
        setMapIssues(data || []);
      }
    };

    fetchMapIssues();
  }, []);

  // Handle map click
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setClickedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    });
    return null;
  };

  // Submit new issue to map_issues
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clickedLocation || !title) return;

    setSubmitting(true);

    const { error } = await supabase
      .from('map_issues')
      .insert([
        {
          title,
          description,
          location: clickedLocation,
          timestamp: new Date().toISOString(),
          upvotes: 0,
          downvotes: 0
        }
      ]);

    if (error) {
      console.error('❌ Error submitting issue:', error.message);
    } else {
      setTitle('');
      setDescription('');
      setClickedLocation(null);
    }

    setSubmitting(false);
  };

  return (
    <div className="relative w-full h-[600px] rounded shadow-md overflow-hidden">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        className="absolute inset-0 z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {/* Main issues passed from parent */}
        {issues.map(issue => (
          <Marker key={`main-${issue.id}`} position={[issue.location.lat, issue.location.lng]}>
            <Popup>
              <strong>{issue.title}</strong><br />
              {issue.description}
            </Popup>
          </Marker>
        ))}

        {/* Popular map-submitted issues */}
        {mapIssues.map(issue => (
          <Marker key={`map-${issue.id}`} position={[issue.location.lat, issue.location.lng]}>
            <Popup>
              <strong>{issue.title}</strong><br />
              {issue.description}
            </Popup>
          </Marker>
        ))}

        {/* New issue form */}
        {clickedLocation && (
          <Marker position={[clickedLocation.lat, clickedLocation.lng]}>
            <Popup>
              <form onSubmit={handleSubmit} className="space-y-2 w-[200px]">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  rows={3}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;

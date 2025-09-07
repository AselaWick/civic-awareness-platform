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
  issues?: Issue[];
}

const GeofencingHandler = () => {
  const map = useMapEvents({
    locationfound(e) {
      const radius = e.accuracy / 2;

      L.marker(e.latlng)
        .addTo(map)
        .bindPopup(`📍 You are within ${Math.round(5000)} meters.`)
        .openPopup();

      L.circle(e.latlng, {
        radius: 5000,//5km
        color: 'blue',
        fillColor: '#cce5ff',
        fillOpacity: 0.3
      }).addTo(map);
    },
    locationerror() {
      alert('Location access denied or unavailable.');
    }
  });

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
  }, [map]);

  return null;
};

const MapView = ({ issues = [] }: MapViewProps) => {
  const center: LatLngExpression = [23.6, 58.5];
  const [mapIssues, setMapIssues] = useState<Issue[]>([]);
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    fetchMapIssues();
  }, []);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setClickedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    });
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clickedLocation || !title) return;

    setSubmitting(true);

    const newIssue = {
      title,
      description,
      location: clickedLocation,
      timestamp: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0
    };

    const { data, error } = await supabase
      .from('map_issues')
      .insert([newIssue])
      .select();

    if (error) {
      console.error('❌ Error submitting issue:', error.message);
    } else {
      setMapIssues(prev => [...prev, ...(data || [])]);
      setTitle('');
      setDescription('');
      setClickedLocation(null);
    }

    setSubmitting(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#1e3a8a',
        border: '1px solid #1e40af',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeofencingHandler />
        <MapClickHandler />

        {[...issues, ...mapIssues].map(issue => (
          <Marker key={issue.id} position={[issue.location.lat, issue.location.lng]}>
            <Popup>
              <strong>{issue.title}</strong><br />
              {issue.description}
            </Popup>
          </Marker>
        ))}

        {clickedLocation && (
          <Marker position={[clickedLocation.lat, clickedLocation.lng]}>
            <Popup>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '200px', color: 'white' }}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '1px solid #1e40af',
                    backgroundColor: '#0f172a',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                  }}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '1px solid #1e40af',
                    backgroundColor: '#0f172a',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: '#1d4ed8',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                  }}
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

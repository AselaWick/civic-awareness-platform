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
import VoteButtons from './VoteButtons';

import markerIcon from '/icons/marker-icon.png';
import markerIcon2x from '/icons/marker-icon-2x.png';
import markerShadow from '/icons/marker-shadow.png';

// Default Leaflet icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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
  media?: {
    images: string[];
    videos: string[];
    links: string[];
  };
}

interface MapViewProps {
  issues?: Issue[];
}

const GeofencingHandler = () => {
  const map = useMapEvents({
    locationfound(e) {
      const fixedRadius = 5000; // 5km

      L.marker(e.latlng)
        .addTo(map)
        .bindPopup(`📍 You are within ${fixedRadius} meters.`)
        .openPopup();

      L.circle(e.latlng, {
        radius: fixedRadius,
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

  // Core state
  const [mapIssues, setMapIssues] = useState<Issue[]>([]);
  const [clickedLocation, setClickedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Media state
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [referenceLink, setReferenceLink] = useState<string>('');
  const [locationName, setLocationName] = useState<string>('');


  // Fetch trending issues
  const fetchMapIssues = async () => {
    const { data, error } = await supabase
      .from('map_issues')
      .select('*')
      .gt('upvotes', 5);

    if (error) {
      console.error('❌ Error fetching map_issues:', error.message);
    } else {
      setMapIssues(data ?? []);
    }
  };

  useEffect(() => {
    fetchMapIssues();
  }, []);

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('issue-media')
        .upload(`images/${Date.now()}-${file.name}`, file);

      if (uploadError) {
        console.error('❌ Image upload error:', uploadError.message);
        continue;
      }

      const { data: publicData } = supabase.storage
        .from('issue-media')
        .getPublicUrl(uploadData.path);

      urls.push(publicData.publicUrl);
    }
    setUploadedImages(urls);
  };

  // Video upload handler
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('issue-media')
        .upload(`videos/${Date.now()}-${file.name}`, file);

      if (uploadError) {
        console.error('❌ Video upload error:', uploadError.message);
        continue;
      }

      const { data: publicData } = supabase.storage
        .from('issue-media')
        .getPublicUrl(uploadData.path);

      urls.push(publicData.publicUrl);
    }
    setUploadedVideos(urls);
  };

  // Submit new issue with media
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clickedLocation || !title) {
      return;
    }

    setSubmitting(true);

    const newIssue = {
      title,
      description,
      location: clickedLocation,
      timestamp: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      media: {
        images: uploadedImages,
        videos: uploadedVideos,
        links: referenceLink ? [referenceLink] : []
      }
    };

    const { data, error } = await supabase
      .from('map_issues')
      .insert([newIssue])
      .select();

    if (error) {
      console.error('❌ Error submitting issue:', error.message);
    } else {
      setMapIssues(prev => [...prev, ...(data ?? [])]);
      // Reset form and media state
      setTitle('');
      setDescription('');
      setClickedLocation(null);
      setUploadedImages([]);
      setUploadedVideos([]);
      setReferenceLink('');
    }

    setSubmitting(false);
  };

 // Replace MapClickHandler with this:
const MapClickHandler = () => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      // 1. Fetch address data from Nominatim
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        // 2. Extract city/town/village + country
        const addr = data.address;
        const city =
          addr.city || addr.town || addr.village || addr.county || '';
        const country = addr.country || '';
        setLocationName(`${city}${city && country ? ', ' : ''}${country}`);
      } catch (err) {
        console.warn('Reverse geocode failed', err);
        setLocationName('');
      }

      // 3. Store raw coords and show form
      setClickedLocation({ lat, lng });
    }
  });
  return null;
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
        overflow: 'hidden'
      }}
    >
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeofencingHandler />
        <MapClickHandler />

        {[...issues, ...mapIssues].map(issue => {
          const isTrending = issue.upvotes >= 5;
          const isViral = issue.upvotes >= 8;

          const popupStyle: React.CSSProperties = {
            fontSize: '0.875rem',
            lineHeight: '1.4',
            border: isViral ? '2px solid red' : isTrending ? '2px solid blue' : 'none',
            padding: '0.5rem',
            borderRadius: '6px',
            backgroundColor: '#f8fafc'
          };

          return (
            <Marker key={issue.id} position={[issue.location.lat, issue.location.lng]}>
              <Popup>
                <div style={popupStyle}>
                  <strong>{issue.title}</strong>
                  <br />
                  {issue.description}
                  <br />
                  <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                    👍 {issue.upvotes} &nbsp;&nbsp; 👎 {issue.downvotes ?? 0}
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <VoteButtons
                      issueId={issue.id}
                      currentUpvotes={issue.upvotes}
                      currentDownvotes={issue.downvotes ?? 0}
                    />
                  </div>

                  {issue.media?.images?.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`image-${i}`}
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                  ))}

                  {issue.media?.videos?.map((url, i) => (
                    <video
                      key={i}
                      src={url}
                      controls
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                  ))}

                  {issue.media?.links?.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', marginTop: '0.5rem', color: 'blue' }}
                    >
                      📎 Reference {i + 1}
                    </a>
                  ))}

                  {isTrending && (
                    <div
                      style={{
                        color: isViral ? 'red' : 'blue',
                        fontWeight: 'bold',
                        marginTop: '0.25rem'
                      }}
                    >
                      🔥 {isViral ? 'Viral' : 'Trending'}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {clickedLocation && (
          <Marker position={[clickedLocation.lat, clickedLocation.lng]}>
            <Popup>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  width: '200px',
                  color: 'white'
                }}
              >
                {/* SHOW RESOLVED ADDRESS HERE */}
                <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                </div>
                {/* Title field */}
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
                    fontSize: '0.875rem'
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
                    fontSize: '0.875rem'
                  }}
                />

                <input
                  type="file"
                  accept="image/*"
                  multiple={true}
                  onChange={handleImageUpload}
                  style={{ color: 'white' }}
                />

                <input
                  type="file"
                  accept="video/*"
                  multiple={true}
                  onChange={handleVideoUpload}
                  style={{ color: 'white' }}
                />

                <input
                  type="url"
                  placeholder="Reference link (optional)"
                  value={referenceLink}
                  onChange={e => setReferenceLink(e.target.value)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    border: '1px solid #1e40af',
                    backgroundColor: '#0f172a',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
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
                    cursor: 'pointer'
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

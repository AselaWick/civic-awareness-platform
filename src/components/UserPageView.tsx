import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { supabase } from '../supabaseClient';
import VoteButtons from './VoteButtons';

type Issue = {
  id: string;
  title?: string;
  description?: string;
  location?: { lat: number; lng: number };
  location_name?: string;
  upvotes?: number;
  downvotes?: number;
  media?: {
    images?: string[];
    videos?: string[];
    links?: string[];
  };
};

const popupStyle = {
  fontSize: '0.85rem',
  lineHeight: '1.4',
  maxWidth: '220px',
};

const UserPageView = () => {
  const { pageId } = useParams();
  const [issues, setIssues] = useState<Issue[]>([]);

  const fetchIssues = async () => {
    const { data, error } = await supabase
      .from('page_issues')
      .select('*')
      .eq('page_id', pageId);

    if (!error && data) {
      setIssues(data);
    } else {
      console.error('Error fetching issues:', error);
    }
  };

  useEffect(() => {
    // Fix marker icon paths for production
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    const channel = supabase
      .channel(`page_issues_${pageId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'page_issues' }, fetchIssues)
      .subscribe();

    fetchIssues();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageId]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {typeof window !== 'undefined' && (
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {issues.map((issue) => {
            const lat = issue.location?.lat;
            const lng = issue.location?.lng;
            if (typeof lat !== 'number' || typeof lng !== 'number') return null;

            const isTrending = (issue.upvotes ?? 0) - (issue.downvotes ?? 0) >= 2;
            const isViral = (issue.upvotes ?? 0) >= 10;

            return (
              <Marker key={issue.id} position={[lat, lng]}>
                <Popup>
                  <div style={popupStyle}>
                    <div style={{ fontSize: '0.75rem', color: '#555' }}>
                      {issue.location_name || `${lat}, ${lng}`}
                    </div>
                    <strong>{issue.title}</strong>
                    <br />
                    {issue.description}
                    <br />
                    <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                      👍 {issue.upvotes ?? 0} &nbsp;&nbsp; 👎 {issue.downvotes ?? 0}
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                      <VoteButtons
                        issueId={issue.id}
                        currentUpvotes={issue.upvotes ?? 0}
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
                          marginTop: '0.25rem',
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
        </MapContainer>
      )}
    </div>
  );
};

export default UserPageView;



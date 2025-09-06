import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
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
const MapView = ({ issues = [] }) => {
    const center = [23.6, 58.5];
    const [mapIssues, setMapIssues] = useState([]);
    const [clickedLocation, setClickedLocation] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        const fetchMapIssues = async () => {
            const { data, error } = await supabase
                .from('map_issues')
                .select('*')
                .gt('upvotes', 5);
            if (error) {
                console.error('❌ Error fetching map_issues:', error.message);
            }
            else {
                setMapIssues(data || []);
            }
        };
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!clickedLocation || !title)
            return;
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
        }
        else {
            setTitle('');
            setDescription('');
            setClickedLocation(null);
        }
        setSubmitting(false);
    };
    return (_jsx("div", { style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#1e3a8a',
            border: '1px solid #1e40af',
            borderRadius: '8px',
            overflow: 'hidden',
        }, children: _jsxs(MapContainer, { center: center, zoom: 6, scrollWheelZoom: true, style: { width: '100%', height: '100%', zIndex: 0 }, children: [_jsx(TileLayer, { attribution: '\u00A9 OpenStreetMap contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), _jsx(MapClickHandler, {}), issues.map(issue => (_jsx(Marker, { position: [issue.location.lat, issue.location.lng], children: _jsxs(Popup, { children: [_jsx("strong", { children: issue.title }), _jsx("br", {}), issue.description] }) }, `main-${issue.id}`))), mapIssues.map(issue => (_jsx(Marker, { position: [issue.location.lat, issue.location.lng], children: _jsxs(Popup, { children: [_jsx("strong", { children: issue.title }), _jsx("br", {}), issue.description] }) }, `map-${issue.id}`))), clickedLocation && (_jsx(Marker, { position: [clickedLocation.lat, clickedLocation.lng], children: _jsx(Popup, { children: _jsxs("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '200px', color: 'white' }, children: [_jsx("input", { type: "text", placeholder: "Title", value: title, onChange: e => setTitle(e.target.value), style: {
                                        padding: '0.25rem 0.5rem',
                                        border: '1px solid #1e40af',
                                        backgroundColor: '#0f172a',
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '0.875rem',
                                    }, required: true }), _jsx("textarea", { placeholder: "Description", value: description, onChange: e => setDescription(e.target.value), rows: 3, style: {
                                        padding: '0.25rem 0.5rem',
                                        border: '1px solid #1e40af',
                                        backgroundColor: '#0f172a',
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '0.875rem',
                                    } }), _jsx("button", { type: "submit", disabled: submitting, style: {
                                        backgroundColor: '#1d4ed8',
                                        color: 'white',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.875rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }, children: submitting ? 'Submitting...' : 'Submit' })] }) }) }))] }) }));
};
export default MapView;

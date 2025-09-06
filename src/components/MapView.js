import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const ResizeFix = () => {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    }, [map]);
    return null;
};
const MapView = ({ issues }) => {
    const center = [23.6, 58.5]; // Default center (Oman)
    return (_jsx("div", { className: "relative w-full h-[500px] rounded shadow-md overflow-hidden", children: _jsxs(MapContainer, { center: center, zoom: 6, scrollWheelZoom: true, className: "absolute inset-0 z-0", children: [_jsx(ResizeFix, {}), _jsx(TileLayer, { attribution: '\u00A9 OpenStreetMap contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), issues.map(issue => (_jsx(Marker, { position: [issue.location.lat, issue.location.lng], children: _jsxs(Popup, { children: [_jsx("strong", { children: issue.title }), _jsx("br", {}), issue.description] }) }, issue.id)))] }) }));
};
export default MapView;

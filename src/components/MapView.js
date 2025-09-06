import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const MapView = ({ issues }) => {
    const center = [23.6, 58.5]; // Default center (Oman)
    return (_jsx("div", { className: "h-[500px] w-full rounded shadow-md overflow-hidden", children: _jsxs(MapContainer, { center: center, zoom: 6, scrollWheelZoom: true, className: "h-full w-full z-0", children: [_jsx(TileLayer, { attribution: '\u00A9 OpenStreetMap contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), issues.map(issue => (_jsx(Marker, { position: [issue.location.lat, issue.location.lng], children: _jsxs(Popup, { children: [_jsx("strong", { children: issue.title }), _jsx("br", {}), issue.description] }) }, issue.id)))] }) }));
};
export default MapView;

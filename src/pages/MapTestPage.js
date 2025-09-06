import { jsx as _jsx } from "react/jsx-runtime";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const MapTestPage = () => {
    return (_jsx("div", { style: { height: '100vh', width: '100%' }, children: _jsx(MapContainer, { center: [23.6, 58.5], zoom: 6, scrollWheelZoom: true, style: { height: '100%', width: '100%' }, children: _jsx(TileLayer, { attribution: '\u00A9 OpenStreetMap contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }) }) }));
};
export default MapTestPage;

import { jsx as _jsx } from "react/jsx-runtime";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const MapTestPage = () => {
    return (_jsx("div", { className: "w-full h-screen", children: _jsx(MapContainer, { center: [23.6, 58.5], zoom: 6, scrollWheelZoom: true, className: "h-full w-full", children: _jsx(TileLayer, { attribution: '\u00A9 OpenStreetMap contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }) }) }));
};
export default MapTestPage;

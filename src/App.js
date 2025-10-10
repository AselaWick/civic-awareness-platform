import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import Login from './assets/auth/Login';
import MapView from './components/MapView';
import './App.css';
import 'leaflet/dist/leaflet.css';
createRoot(document.getElementById('root')).render(_jsx(App, {}));
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MapView, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) })] }));
}
export default App;

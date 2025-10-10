import 'leaflet/dist/leaflet.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Routes, Route } from 'react-router-dom';
import Login from './assets/auth/Login';
import MapView from './components/MapView';


import './App.css';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')!).render(<App />);
function App() {
  return (
    <Routes>
      {/* Default route: MapView */}
      <Route path="/" element={<MapView />} />

      {/* Optional login route */}
      <Route path="/login" element={<Login />} />

      {/* Future home route (if you re-enable CivicHome inline or modularize it) */}
      {/* <Route path="/home" element={<CivicHome />} /> */}
    </Routes>
  );
}

export default App;

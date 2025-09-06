import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapTestPage from '../pages/MapTestPage';

const MapTestRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/map-test" element={<MapTestPage />} />
      </Routes>
    </Router>
  );
};

export default MapTestRouter;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import React from 'react';
import ReactDOM from 'react-dom/client';
import MapTestRouter from './test/MapTestRouter'; // ✅ not App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapTestRouter />
  </React.StrictMode>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

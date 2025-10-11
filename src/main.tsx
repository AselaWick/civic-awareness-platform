import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from './supabaseClient';

import HomePage from './pages/HomePage';
import UserPageView from './components/UserPageView';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id/page/:pageId" element={<UserPageView />} />
        </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  </React.StrictMode>
);

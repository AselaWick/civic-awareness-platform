import React, { useState, useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from '../supabaseClient';
import MyMapButton from '../components/MyMapButton';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'trending'>('live');
  const { session } = useSessionContext();
  const user = session?.user;

  console.log('✅ HomePage.tsx is rendering');
  console.log('✅ Supabase session from context:', session);
  console.log('✅ Extracted user:', user);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('🔍 Manual session check:', data?.session);
      if (error) console.error('❌ Error fetching session:', error);
    };

    checkSession();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#1e3a8a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        width: '100%',
      }}
    >
      {/* Map Section */}
      <div style={{ height: '600px', width: '100%', borderBottom: '1px solid #1e3a8a' }}>
        <MapView />
      </div>

      {/* My Map Button */}
      {user && (
        <div style={{ textAlign: 'center', margin: '1rem 0' }}>
          <MyMapButton user={{ id: 'test-id', email: 'test@example.com' }} />
        </div>
      )}

      {/* Tab Navigation and Content */}
      <div style={{ padding: '1rem', backgroundColor: '#0f172a', borderTop: '1px solid #1e3a8a' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('live')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: activeTab === 'live' ? '#1d4ed8' : '#1e40af',
              color: activeTab === 'live' ? 'white' : '#cbd5e1',
              fontWeight: activeTab === 'live' ? '600' : '500',
              transition: 'background-color 0.2s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Live Issues
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: activeTab === 'trending' ? '#1d4ed8' : '#1e40af',
              color: activeTab === 'trending' ? 'white' : '#cbd5e1',
              fontWeight: activeTab === 'trending' ? '600' : '500',
              transition: 'background-color 0.2s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Trending Issues
          </button>
        </div>

        <div style={{ padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#1e3a8a' }}>
          {activeTab === 'live' && <LiveIssues />}
          {activeTab === 'trending' && <TrendingIssues />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

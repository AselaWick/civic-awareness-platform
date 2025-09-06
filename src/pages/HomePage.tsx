import React, { useState } from 'react';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'trending'>('live');

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

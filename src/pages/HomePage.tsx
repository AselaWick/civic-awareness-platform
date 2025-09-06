import React, { useState } from 'react';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'trending'>('live');

  return (
    <div
      style={{ backgroundColor: '#1e3a8a', minHeight: '100vh' }}
      className="w-full flex flex-col text-white"
    >
      {/* Map Section */}
      <div className="h-[60vh] border-b border-blue-800 shadow-md">
        <MapView />
      </div>

      {/* Tab Navigation and Content */}
      <div className="p-4 bg-blue-950 border-t border-blue-800">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded transition ${
              activeTab === 'live'
                ? 'bg-blue-700 text-white font-semibold'
                : 'bg-blue-900 text-blue-100 hover:bg-blue-800'
            }`}
          >
            Live Issues
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded transition ${
              activeTab === 'trending'
                ? 'bg-blue-700 text-white font-semibold'
                : 'bg-blue-900 text-blue-100 hover:bg-blue-800'
            }`}
          >
            Trending Issues
          </button>
        </div>

        <div className="p-2 rounded bg-blue-900">
          {activeTab === 'live' && <LiveIssues />}
          {activeTab === 'trending' && <TrendingIssues />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

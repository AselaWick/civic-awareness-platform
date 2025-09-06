import React, { useState } from 'react';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'trending'>('live');

  return (
    <div
      style={{ backgroundColor: '#e0f2fe', minHeight: '100vh' }}
      className="w-full flex flex-col"
    >
      {/* Map Section */}
      <div className="flex-grow">
        <MapView />
      </div>

      {/* Tab Navigation and Content */}
      <div className="p-4 border-t border-blue-200">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded transition ${
              activeTab === 'live'
                ? 'bg-blue-300 text-blue-900 font-semibold'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            Live Issues
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded transition ${
              activeTab === 'trending'
                ? 'bg-blue-300 text-blue-900 font-semibold'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            Trending Issues
          </button>
        </div>

        <div className="p-2 rounded">
          {activeTab === 'live' && <LiveIssues />}
          {activeTab === 'trending' && <TrendingIssues />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

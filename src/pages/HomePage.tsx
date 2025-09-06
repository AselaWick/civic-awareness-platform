import React, { useState } from 'react';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'trending'>('live');

  return (
    <div
      style={{ backgroundColor: '#f3f4f6', minHeight: '100vh' }} // Tailwind's gray-100
      className="w-full flex flex-col text-gray-900"
    >
      {/* Map Section */}
      <div className="flex-grow">
        <MapView />
      </div>

      {/* Tab Navigation and Content */}
      <div className="p-4 border-t border-gray-300 bg-gray-200">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded transition ${
              activeTab === 'live'
                ? 'bg-gray-400 text-white font-semibold'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            Live Issues
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded transition ${
              activeTab === 'trending'
                ? 'bg-gray-400 text-white font-semibold'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            Trending Issues
          </button>
        </div>

        <div className="p-2 rounded bg-gray-100">
          {activeTab === 'live' && <LiveIssues />}
          {activeTab === 'trending' && <TrendingIssues />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

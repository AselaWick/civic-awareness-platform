import React, { useState } from 'react';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'trending'>('live');

  return (
    <div className="w-full min-h-screen flex flex-col bg-sky-100">
      {/* Map Section */}
      <div className="flex-grow">
        <MapView />
      </div>

      {/* Tab Navigation and Content */}
      <div className="bg-sky-50 shadow-inner p-4 border-t border-sky-200">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded transition ${
              activeTab === 'live'
                ? 'bg-sky-300 text-sky-900 font-semibold'
                : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
            }`}
          >
            Live Issues
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded transition ${
              activeTab === 'trending'
                ? 'bg-sky-300 text-sky-900 font-semibold'
                : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
            }`}
          >
            Trending Issues
          </button>
        </div>

        <div className="bg-sky-50 p-2 rounded shadow-sm">
          {activeTab === 'live' && <LiveIssues />}
          {activeTab === 'trending' && <TrendingIssues />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

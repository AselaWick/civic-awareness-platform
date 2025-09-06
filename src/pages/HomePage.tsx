import React, { useState } from 'react';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'trending'>('live');

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex-grow">
        <MapView />
      </div>

      <div className="bg-white shadow-md p-4">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded ${activeTab === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Live Issues
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded ${activeTab === 'trending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Trending Issues
          </button>
        </div>

        {activeTab === 'live' && <LiveIssues />}
        {activeTab === 'trending' && <TrendingIssues />}
      </div>
    </div>
  );
};

export default HomePage;

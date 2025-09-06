import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';
const HomePage = () => {
    const [activeTab, setActiveTab] = useState('live');
    return (_jsxs("div", { className: "w-full h-screen flex flex-col bg-sky-100", children: [_jsx("div", { className: "flex-grow", children: _jsx(MapView, {}) }), _jsxs("div", { className: "bg-white shadow-md p-4", children: [_jsxs("div", { className: "flex gap-4 mb-4", children: [_jsx("button", { onClick: () => setActiveTab('live'), className: `px-4 py-2 rounded ${activeTab === 'live' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`, children: "Live Issues" }), _jsx("button", { onClick: () => setActiveTab('trending'), className: `px-4 py-2 rounded ${activeTab === 'trending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`, children: "Trending Issues" })] }), activeTab === 'live' && _jsx(LiveIssues, {}), activeTab === 'trending' && _jsx(TrendingIssues, {})] })] }));
};
export default HomePage;

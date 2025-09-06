import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import MapView from '../components/MapView';
import LiveIssues from '../components/LiveIssues';
import TrendingIssues from '../components/TrendingIssues';
const HomePage = () => {
    const [activeTab, setActiveTab] = useState('live');
    return (_jsxs("div", { className: "w-full h-screen flex flex-col bg-sky-100", children: [_jsx("div", { className: "flex-grow", children: _jsx(MapView, {}) }), _jsxs("div", { className: "bg-sky-50 shadow-inner p-4 border-t border-sky-200", children: [_jsxs("div", { className: "flex gap-4 mb-4", children: [_jsx("button", { onClick: () => setActiveTab('live'), className: `px-4 py-2 rounded transition ${activeTab === 'live'
                                    ? 'bg-sky-300 text-sky-900 font-semibold'
                                    : 'bg-sky-100 text-sky-700 hover:bg-sky-200'}`, children: "Live Issues" }), _jsx("button", { onClick: () => setActiveTab('trending'), className: `px-4 py-2 rounded transition ${activeTab === 'trending'
                                    ? 'bg-sky-300 text-sky-900 font-semibold'
                                    : 'bg-sky-100 text-sky-700 hover:bg-sky-200'}`, children: "Trending Issues" })] }), _jsxs("div", { className: "bg-sky-50 p-2 rounded shadow-sm", children: [activeTab === 'live' && _jsx(LiveIssues, {}), activeTab === 'trending' && _jsx(TrendingIssues, {})] })] })] }));
};
export default HomePage;

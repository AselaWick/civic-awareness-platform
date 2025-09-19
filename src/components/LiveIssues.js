import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import VoteButtons from './VoteButtons';
import MapView from './MapView';
const LiveIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    useEffect(() => {
        const fetchIssues = async () => {
            const { data, error } = await supabase
                .from('map_issues')
                .select('*')
                .order('timestamp', { ascending: false });
            if (error) {
                console.error('❌ Fetch error:', error.message);
            }
            else {
                setIssues(data || []);
            }
            setLoading(false);
        };
        fetchIssues();
        const subscription = supabase
            .channel('public:map_issues')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'map_issues' }, payload => {
            const updated = payload.new;
            setIssues(prev => prev.map(i => (i.id === updated.id ? updated : i)));
        })
            .subscribe();
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);
    // 1. Apply search + type filter
    const filteredIssues = issues.filter(issue => {
        const q = searchQuery.toLowerCase();
        const matchesText = issue.title.toLowerCase().includes(q) ||
            issue.description.toLowerCase().includes(q) ||
            (issue.location_name || '')
                .toLowerCase()
                .includes(q);
        const matchesType = filterType === '' || issue.type === filterType;
        return matchesText && matchesType;
    });
    // 2. Issues for the map (strong feedback)
    const mapEligibleIssues = issues.filter(issue => issue.upvotes >= 5 || issue.downvotes >= 5);
    return (_jsxs("div", { className: "bg-gray-100 p-4 rounded shadow-md mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Live Issues" }), loading ? (_jsx("p", { className: "text-sm text-gray-600", children: "Loading issues..." })) : issues.length === 0 ? (_jsx("p", { className: "text-sm text-gray-600", children: "No issues reported yet." })) : (_jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [_jsxs("div", { className: "lg:w-1/2 flex flex-wrap gap-4 mb-4", children: [_jsx("input", { type: "text", placeholder: "Search title, description or location\u2026", value: searchQuery, onChange: e => setSearchQuery(e.target.value), className: "flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm text-sm" }), _jsxs("select", { value: filterType, onChange: e => setFilterType(e.target.value), className: "px-4 py-2 border border-gray-300 rounded text-sm", children: [_jsx("option", { value: "", children: "All Types" }), _jsx("option", { value: "news", children: "News" }), _jsx("option", { value: "emergency", children: "Emergency" }), _jsx("option", { value: "sport", children: "Sport" }), _jsx("option", { value: "conflicts", children: "Conflicts" }), _jsx("option", { value: "other", children: "Other" })] })] }), _jsx("div", { className: "lg:w-1/2 overflow-x-auto", children: _jsxs("table", { className: "min-w-full bg-white border border-gray-300 rounded", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Title" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Description" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Type" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Location" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Upvotes" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Downvotes" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Actions" })] }) }), _jsx("tbody", { children: filteredIssues.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "px-4 py-2 text-sm text-gray-500 text-center", children: "No matching issues found." }) })) : (filteredIssues.map(issue => {
                                        const isMapVisible = issue.upvotes >= 5 || issue.downvotes >= 5;
                                        const displayLocation = issue.location_name ||
                                            `${issue.location.lat.toFixed(4)}, ${issue.location.lng.toFixed(4)}`;
                                        return (_jsxs("tr", { className: `border-t border-gray-200 ${isMapVisible ? 'bg-blue-50' : ''}`, children: [_jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.title }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.description }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.type }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: displayLocation }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.upvotes }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.downvotes }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: _jsx(VoteButtons, { issueId: issue.id, currentUpvotes: issue.upvotes, currentDownvotes: issue.downvotes }) })] }, issue.id));
                                    })) })] }) }), _jsx("div", { className: "lg:w-1/2", children: _jsx(MapView, { issues: mapEligibleIssues }) })] }))] }));
};
export default LiveIssues;

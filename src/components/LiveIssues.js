import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
const LiveIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchIssues = async () => {
            const { data, error } = await supabase
                .from('issues')
                .select('*')
                .order('timestamp', { ascending: false });
            if (error) {
                console.error('❌ Fetch error:', error.message);
            }
            else {
                console.log('✅ Fetched issues:', data);
                setIssues(data || []);
            }
            setLoading(false);
        };
        fetchIssues();
    }, []);
    return (_jsxs("div", { className: "bg-gray-200 p-4 rounded shadow-md mb-6 overflow-x-auto", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Live Issues" }), loading ? (_jsx("p", { className: "text-sm text-gray-600", children: "Loading issues..." })) : issues.length === 0 ? (_jsx("p", { className: "text-sm text-gray-600", children: "No issues reported yet." })) : (_jsxs("table", { className: "min-w-full bg-white border border-gray-300 rounded", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Title" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Description" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Latitude" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Longitude" }), _jsx("th", { className: "px-4 py-2 text-left text-sm font-semibold text-gray-700", children: "Votes" })] }) }), _jsx("tbody", { children: issues.map(issue => (_jsxs("tr", { className: "border-t border-gray-200", children: [_jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.title }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.description }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.location?.lat }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.location?.lng }), _jsx("td", { className: "px-4 py-2 text-sm text-gray-800", children: issue.votes })] }, issue.id))) })] }))] }));
};
export default LiveIssues;

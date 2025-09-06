import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Report from './Report';
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
        const subscription = supabase
            .channel('public:issues')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'issues' }, payload => {
            console.log('📡 New issue received:', payload.new);
            if (payload.new) {
                setIssues(prev => [payload.new, ...prev]);
            }
        })
            .subscribe();
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);
    return (_jsxs("div", { className: "bg-gray-200 p-4 rounded shadow-md mb-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Live Issues" }), loading ? (_jsx("p", { className: "text-sm text-gray-600", children: "Loading issues..." })) : issues.length === 0 ? (_jsx("p", { className: "text-sm text-gray-600", children: "No issues reported yet." })) : (issues.map(issue => (_jsx(Report, { title: issue.title, description: issue.description }, issue.id))))] }));
};
export default LiveIssues;

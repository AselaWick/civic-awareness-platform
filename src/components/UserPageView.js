import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { supabase } from '../supabaseClient';
import VoteButtons from './VoteButtons';
const popupStyle = {
    fontSize: '0.85rem',
    lineHeight: '1.4',
    maxWidth: '220px',
};
const UserPageView = () => {
    const { pageId } = useParams();
    const [issues, setIssues] = useState([]);
    const fetchIssues = async () => {
        const { data, error } = await supabase
            .from('page_issues')
            .select('*')
            .eq('page_id', pageId);
        if (!error && data) {
            setIssues(data);
        }
        else {
            console.error('Error fetching issues:', error);
        }
    };
    useEffect(() => {
        // Fix marker icon paths for production
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });
        const channel = supabase
            .channel(`page_issues_${pageId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'page_issues' }, fetchIssues)
            .subscribe();
        fetchIssues();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [pageId]);
    return (_jsx("div", { style: { height: '100vh', width: '100%' }, children: typeof window !== 'undefined' && (_jsxs(MapContainer, { center: [20.5937, 78.9629], zoom: 5, style: { height: '100%', width: '100%' }, children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), issues.map((issue) => {
                    const lat = issue.location?.lat;
                    const lng = issue.location?.lng;
                    if (typeof lat !== 'number' || typeof lng !== 'number')
                        return null;
                    const isTrending = (issue.upvotes ?? 0) - (issue.downvotes ?? 0) >= 2;
                    const isViral = (issue.upvotes ?? 0) >= 10;
                    return (_jsx(Marker, { position: [lat, lng], children: _jsx(Popup, { children: _jsxs("div", { style: popupStyle, children: [_jsx("div", { style: { fontSize: '0.75rem', color: '#555' }, children: issue.location_name || `${lat}, ${lng}` }), _jsx("strong", { children: issue.title }), _jsx("br", {}), issue.description, _jsx("br", {}), _jsxs("div", { style: { marginTop: '0.5rem', fontWeight: 'bold' }, children: ["\uD83D\uDC4D ", issue.upvotes ?? 0, " \u00A0\u00A0 \uD83D\uDC4E ", issue.downvotes ?? 0] }), _jsx("div", { style: { marginTop: '0.5rem' }, children: _jsx(VoteButtons, { issueId: issue.id, currentUpvotes: issue.upvotes ?? 0, currentDownvotes: issue.downvotes ?? 0 }) }), issue.media?.images?.map((url, i) => (_jsx("img", { src: url, alt: `image-${i}`, style: { width: '100%', marginTop: '0.5rem' } }, i))), issue.media?.videos?.map((url, i) => (_jsx("video", { src: url, controls: true, style: { width: '100%', marginTop: '0.5rem' } }, i))), issue.media?.links?.map((link, i) => (_jsxs("a", { href: link, target: "_blank", rel: "noopener noreferrer", style: { display: 'block', marginTop: '0.5rem', color: 'blue' }, children: ["\uD83D\uDCCE Reference ", i + 1] }, i))), isTrending && (_jsxs("div", { style: {
                                            color: isViral ? 'red' : 'blue',
                                            fontWeight: 'bold',
                                            marginTop: '0.25rem',
                                        }, children: ["\uD83D\uDD25 ", isViral ? 'Viral' : 'Trending'] }))] }) }) }, issue.id));
                })] })) }));
};
export default UserPageView;

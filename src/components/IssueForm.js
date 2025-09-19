import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Button from './Button';
const IssueForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [type, setType] = useState(''); // ← new state
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase
            .from('map_issues') // ← updated table name
            .insert([
            {
                title,
                description,
                type, // ← now includes 'other'
                location: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                },
                upvotes: 0,
                downvotes: 0,
            },
        ]);
        setLoading(false);
        if (error) {
            console.error('❌ Submission error:', error.message);
            alert('❌ Submission failed: ' + error.message);
        }
        else {
            alert('✅ Issue submitted successfully!');
            // reset form
            setTitle('');
            setDescription('');
            setLat('');
            setLng('');
            setType(''); // ← reset the type
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "bg-gray-200 p-4 rounded shadow-md mb-6", children: [_jsx("label", { htmlFor: "issue-title", className: "block mb-2 font-semibold", children: "Title" }), _jsx("input", { id: "issue-title", name: "title", type: "text", value: title, onChange: e => setTitle(e.target.value), placeholder: "Issue title", className: "w-full p-2 border rounded mb-4", required: true, autoComplete: "off" }), _jsx("label", { htmlFor: "issue-description", className: "block mb-2 font-semibold", children: "Description" }), _jsx("textarea", { id: "issue-description", name: "description", value: description, onChange: e => setDescription(e.target.value), placeholder: "Describe the issue...", className: "w-full p-2 border rounded mb-4", required: true, autoComplete: "off" }), _jsx("label", { htmlFor: "issue-type", className: "block mb-2 font-semibold", children: "Type" }), _jsxs("select", { id: "issue-type", name: "type", value: type, onChange: e => setType(e.target.value), className: "w-full p-2 border rounded mb-4 bg-white", required: true, children: [_jsx("option", { value: "", disabled: true, children: "\u2014 Select a type \u2014" }), _jsx("option", { value: "news", children: "News" }), _jsx("option", { value: "emergency", children: "Emergency" }), _jsx("option", { value: "sport", children: "Sport" }), _jsx("option", { value: "conflicts", children: "Conflicts" }), _jsx("option", { value: "other", children: "Other" }), "   "] }), _jsx("label", { htmlFor: "issue-lat", className: "block mb-2 font-semibold", children: "Latitude" }), _jsx("input", { id: "issue-lat", name: "lat", type: "number", value: lat, onChange: e => setLat(e.target.value), placeholder: "e.g. 23.6102", className: "w-full p-2 border rounded mb-4", required: true, autoComplete: "off" }), _jsx("label", { htmlFor: "issue-lng", className: "block mb-2 font-semibold", children: "Longitude" }), _jsx("input", { id: "issue-lng", name: "lng", type: "number", value: lng, onChange: e => setLng(e.target.value), placeholder: "e.g. 58.5453", className: "w-full p-2 border rounded mb-4", required: true, autoComplete: "off" }), _jsx(Button, { text: loading ? 'Submitting...' : 'Submit Issue', type: "submit", onClick: () => { } })] }));
};
export default IssueForm;

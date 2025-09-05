import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import supabase from '../supabaseClient';
import Button from './Button';
const IssueForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.from('issues').insert([
            {
                title,
                description,
                location: {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                },
                votes: 0
            }
        ]);
        if (error) {
            alert('Error: ' + error.message);
        }
        else {
            alert('Issue submitted successfully!');
            setTitle('');
            setDescription('');
            setLat('');
            setLng('');
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-4 rounded shadow-md mb-6", children: [_jsx("label", { className: "block mb-2 font-semibold", children: "Title" }), _jsx("input", { type: "text", value: title, onChange: e => setTitle(e.target.value), placeholder: "Issue title", className: "w-full p-2 border rounded mb-4", required: true }), _jsx("label", { className: "block mb-2 font-semibold", children: "Description" }), _jsx("textarea", { value: description, onChange: e => setDescription(e.target.value), placeholder: "Describe the issue...", className: "w-full p-2 border rounded mb-4", required: true }), _jsx("label", { className: "block mb-2 font-semibold", children: "Latitude" }), _jsx("input", { type: "text", value: lat, onChange: e => setLat(e.target.value), placeholder: "e.g. 23.6102", className: "w-full p-2 border rounded mb-4", required: true }), _jsx("label", { className: "block mb-2 font-semibold", children: "Longitude" }), _jsx("input", { type: "text", value: lng, onChange: e => setLng(e.target.value), placeholder: "e.g. 58.5453", className: "w-full p-2 border rounded mb-4", required: true }), _jsx(Button, { text: "Submit Issue", onClick: () => { } })] }));
};
export default IssueForm;

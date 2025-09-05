import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import Button from './components/Button';
import Report from './components/Report';
import IssueForm from './components/IssueForm';
import { useState } from 'react';
import LiveIssues from './components/LiveIssues';
function App() {
    const [showIssueForm, setShowIssueForm] = useState(false);
    const handleSubmit = () => {
        alert('Query submitted!');
    };
    const handleSubmitQuery = () => {
        setShowIssueForm(prev => !prev);
    };
    return (_jsxs("div", { className: "min-h-screen bg-blue-50 text-gray-800 font-sans", children: [_jsx("header", { className: "bg-blue-900 text-white p-6 text-center text-2xl font-bold", children: "Civic Awareness Platform" }), _jsxs("main", { className: "p-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx(Button, { text: "Submit Query", onClick: handleSubmit }), _jsx(Button, { text: "Report an Issue", onClick: () => alert('Issue reported!') }), _jsx(Button, { text: "View Petitions", onClick: () => alert('Viewing petitions...') })] }), _jsxs("form", { className: "bg-white p-4 rounded shadow-md mb-6", children: [_jsx("label", { className: "block mb-2 font-semibold", children: "Your Query" }), _jsx("input", { type: "text", placeholder: "Type your concern...", className: "w-full p-2 border rounded mb-4" }), _jsx(Button, { text: "Submit", onClick: handleSubmit })] }), showIssueForm && _jsx(IssueForm, {}), _jsx(LiveIssues, {}), " ", _jsxs("div", { className: "bg-white p-4 rounded shadow-md", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Trending Issues" }), _jsx(Report, { title: "Flood Alert", description: "Heavy rains in region..." }), _jsx(Report, { title: "Disease Outbreak", description: "Cases rising in urban zones..." }), _jsx(Report, { title: "Protest Movement", description: "Citizens demand clean water..." })] })] })] }));
}
export default App;

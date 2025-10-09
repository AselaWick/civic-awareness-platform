import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
const Login = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            setMessage('Login failed: ' + error.message);
        }
        else {
            setMessage('Check your email for the login link.');
        }
    };
    return (_jsxs("div", { style: {
            backgroundColor: '#0f172a',
            color: 'white',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
        }, children: [_jsx("h1", { style: { fontSize: '2rem', marginBottom: '1rem' }, children: "Login to Civic Awareness" }), _jsx("input", { type: "email", placeholder: "Enter your email", value: email, onChange: e => setEmail(e.target.value), style: {
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    marginBottom: '1rem',
                    width: '300px'
                } }), _jsx("button", { onClick: handleLogin, style: {
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    backgroundColor: '#1d4ed8',
                    color: 'white',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                }, children: "Send Login Link" }), message && _jsx("p", { style: { marginTop: '1rem' }, children: message })] }));
};
export default Login;

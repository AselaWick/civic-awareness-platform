import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { supabase } from '../../supabaseClient';
export default function Login() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const handleEmailLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            setMessage(`Error: ${error.message}`);
        }
        else {
            setMessage('Check your email for the login link.');
        }
        setLoading(false);
    };
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://civic-awareness-platform.vercel.app/login/callback'
            }
        });
    };
    return (_jsxs("div", { style: { maxWidth: '400px', margin: 'auto', padding: '2rem' }, children: [_jsx("h2", { children: "Login to Civic Awareness" }), _jsx("input", { type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value), style: { width: '100%', padding: '0.5rem', marginBottom: '1rem' } }), _jsx("button", { onClick: handleEmailLogin, disabled: loading, style: { width: '100%', marginBottom: '1rem' }, children: loading ? 'Sending...' : 'Login via Email' }), _jsx("hr", { style: { margin: '2rem 0' } }), _jsx("button", { onClick: handleGoogleLogin, style: { width: '100%' }, children: "Login with Google" }), message && _jsx("p", { style: { marginTop: '1rem', color: 'green' }, children: message })] }));
}

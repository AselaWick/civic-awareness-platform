import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
const Login = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            setMessage('Login failed: ' + error.message);
        }
        else {
            setMessage('Check your email for the login link.');
        }
    };
    // Redirect to /home if session is active
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate('/MapView');
            }
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                navigate('/MapView');
            }
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
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

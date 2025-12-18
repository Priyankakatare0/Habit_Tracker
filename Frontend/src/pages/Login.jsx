import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setError('');
            const res = await axios.post('https://habit-tracker-3-xfc8.onrender.com/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h1>Habit Tracker</h1>
            <p className="auth-subtitle">Sign in to your account</p>
            {error && <p className="error-message">{error}</p>}
            
            <div className="form-group">
                <label>Email</label>
                <input 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />
            </div>

            <button onClick={handleLogin} className="auth-button">Login</button>
            
            <p className="auth-link">
                Don't have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
            </p>
        </div>
    );
};

export default Login


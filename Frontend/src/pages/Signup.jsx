import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            setError('');
            await axios.post('https://habit-tracker-3-xfc8.onrender.com/api/auth/register', { username, email, password });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="auth-container">
            <h1>Habit Tracker</h1>
            <p className="auth-subtitle">Create your account</p>
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
                <label>Username</label>
                <input 
                    placeholder="Enter your username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                />
            </div>

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

            <button onClick={handleSignup} className="auth-button">Sign Up</button>

            <p className="auth-link">
                Already have an account? <span onClick={() => navigate('/login')}>Login</span>
            </p>
        </div>
    )
}

export default Signup

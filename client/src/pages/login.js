// client/src/pages/login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify({
                    ...data.user,
                    isLoggedIn: true
                }));
                
                navigate('/home');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed. Please try again.');
        }
    };

    return ( 
        <div className="glass-bg">
            <h1>Login to your account.</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="text-input">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <br /><br />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div>
                    <button type="submit" className="loginButton">Login</button>
                </div>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
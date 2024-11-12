import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch('http://localhost:3001/api/register', {
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
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="glass-bg">
            <h1>Register your account.</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="text-input">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <br /><br />
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
                    <button type="submit" className="registerButton">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
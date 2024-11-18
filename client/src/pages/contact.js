import React, { useState } from 'react';
import '../styles/contact.css';
import Nav from '../components/Nav';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                setError(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="contact-page">
            <Nav />
            <div className="glass-bg">
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">Message sent successfully!</div>}
                    
                    <div className="text-input">
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="text-input">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="text-input">
                        <textarea 
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button type="submit" className="loginButton">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
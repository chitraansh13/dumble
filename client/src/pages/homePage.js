// client/src/pages/homePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';

function HomePage() {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        bio: '',
        goal: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            navigate('/login');
            return;
        }
        const userData = JSON.parse(loggedInUser);
        setUser(userData);
        setProfile({
            bio: userData.bio || '',
            goal: userData.goal || ''
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleProfileUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${user.uuid}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile)
            });

            const data = await response.json();

            if (response.ok) {
                // Update local storage with new user data
                const updatedUser = { ...user, ...data.user };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setEditing(false);
                alert('Profile updated successfully!');
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    if (!user) return null;

    return (
        <div className="home-container">
            <nav className="home-nav">
                <h2>Welcome, {user.name}!</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </nav>
            <div className="home-content">
                <h1>Your Profile</h1>
                {editing ? (
                    <div className="profile-edit">
                        <div className="form-group">
                            <label>Bio:</label>
                            <textarea
                                value={profile.bio || ''}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                        <div className="form-group">
                            <label>Goal:</label>
                            <textarea
                                value={profile.goal || ''}
                                onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                                placeholder="What's your fitness goal?"
                            />
                        </div>
                        <div className="button-group">
                            <button onClick={handleProfileUpdate} className="save-btn">Save</button>
                            <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-view">
                        <div className="profile-section">
                            <h3>Bio</h3>
                            <p>{user.bio || 'No bio yet'}</p>
                        </div>
                        <div className="profile-section">
                            <h3>Goal</h3>
                            <p>{user.goal || 'No goal set'}</p>
                        </div>
                        <button onClick={() => setEditing(true)} className="edit-btn">Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
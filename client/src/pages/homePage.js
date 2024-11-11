import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './homePage.css';

function HomePage() {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        bio: '',
        goal: ''
    });
    const [error, setError] = useState('');
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
        setError('');
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
                const updatedUser = { ...user, ...data.user };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setEditing(false);
            } else {
                setError(data.message || 'Update failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to update profile. Please try again.');
        }
    };

    if (!user) return null;

    return (
        <div >
            <nav className="home-nav">
                <h2>Welcome, {user.name}!</h2>
                <button onClick={handleLogout} className="logoutButton">Logout</button>
            </nav>
            {error && <div className="error-message">{error}</div>}
            
            <div className="navigation-grid">
                <Link to="/diet" className="nav-card">
                    <div className="nav-content">
                        <h3>Diet Page</h3>
                        <p>Track your nutrition and meal plans</p>
                    </div>
                </Link>
                <Link to="/gymbro" className="nav-card">
                    <div className="nav-content">
                        <h3>Gym Bro</h3>
                        <p>Meet people on Dumble</p>
                    </div>
                </Link>
                <Link to="/track-workout" className="nav-card">
                    <div className="nav-content">
                        <h3>Track Workout</h3>
                        <p>Log and monitor your exercises</p>
                    </div>
                </Link>
                <Link to="/workout-routine" className="nav-card">
                    <div className="nav-content">
                        <h3>Workout Routine</h3>
                        <p>View and plan your workouts</p>
                    </div>
                </Link>
                <Link to="/challenges" className="nav-card">
                    <div className="nav-content">
                        <h3>Challenges</h3>
                        <p>Take on fitness challenges with your gym bros</p>
                    </div>
                </Link>
            </div>

            <div className="home-content">
                <h1>Your Profile</h1>
                {editing ? (
                    <div className="profile-edit">
                        <div className="text-input-home">
                            <label>Bio:</label>
                            <textarea
                                value={profile.bio || ''}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                placeholder="Tell us about yourself..."
                                className="custom-textarea"
                            />
                        </div>
                        <div className="text-input-home">
                            <label>Goal:</label>
                            <textarea
                                value={profile.goal || ''}
                                onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                                placeholder="What's your fitness goal?"
                                className="custom-textarea"
                            />
                        </div>
                        <div className="button-group">
                            <button onClick={handleProfileUpdate} className="saveButton">Save</button>
                            <button onClick={() => setEditing(false)} className="cancelButton">Cancel</button>
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
                        <button onClick={() => setEditing(true)} className="editButton">Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
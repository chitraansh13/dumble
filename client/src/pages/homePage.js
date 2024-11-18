import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import StatsCard from '../components/StatsCard';
import FriendsCard from '../components/FriendsCard';
import '../styles/dashboard.css'; // Reusing Dashboard styles

const HomePage = () => {
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
        <div className="app">
            <Nav />
            <div className="dashboard">
                <h2 className='intro-text'>Hi, {user.name}!</h2>
                <br/>
                <div className="stats-container">
                    <Link to="/diet" className="card-link">
                        <StatsCard
                            title="Diet Page"
                            value="Your Diet"
                            subtitle="Track your nutrition and meal plans"
                            icon="🔥"
                        />
                    </Link>
                    <Link to="/track-workout" className="card-link">
                        <StatsCard
                            title="Track Workout"
                            value="Log"
                            subtitle="Monitor your exercises"
                            icon="💪"
                        />
                    </Link>
                    <Link to="/workout-routine" className="card-link">
                        <StatsCard
                            title="Workout Routine"
                            value="Plan"
                            subtitle="View and create workout routines"
                            icon="📝"
                        />
                    </Link>
                </div>
                <div className="charts-container">
                    <Link to="/challenges" className="card-link">
                        <FriendsCard
                            title="Challenges"
                            value="Compete"
                            subtitle="Take on challenges with friends"
                            icon="🏆"
                        />
                    </Link>
                    <Link to="/gymbro" className="card-link">
                        <FriendsCard
                            title="Gym Bro"
                            value="Find"
                            subtitle="Meet workout partners"
                            icon="🤝"
                        />
                    </Link>
                </div>
                <div className="profile-section">
                    <h1>Your Profile</h1>
                    {editing ? (
                        <div className="profile-edit">
                            <div className="text-input-home">
                                <label>Bio:</label>
                                <textarea
                                    value={profile.bio || ''}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    placeholder="Tell us about yourself..."
                                    className="custom-textarea styled-input"
                                />
                            </div>
                            <div className="text-input-home">
                                <label>Goal:</label>
                                <textarea
                                    value={profile.goal || ''}
                                    onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                                    placeholder="What's your fitness goal?"
                                    className="custom-textarea styled-input"
                                />
                            </div>
                            <div className="button-group styled-button-group">
                                <button onClick={handleProfileUpdate} className="saveButton styled-saveButton">
                                    Save
                                </button>
                                <button onClick={() => setEditing(false)} className="cancelButton styled-cancelButton">
                                    Cancel
                                </button>
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
                            <button onClick={() => setEditing(true)} className="editButton styled-editButton">
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;

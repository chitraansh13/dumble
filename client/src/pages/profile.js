import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import '../styles/profile.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        bio: '',
        goal: '',
        location: '',
        age: '',
        experience: '',
        gender: '',
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
            goal: userData.goal || '',
            location: userData.location || '',
            age: userData.age || '',
            experience: userData.experience || '',
            gender: userData.gender || ''
        });
    }, [navigate]);

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
                const updatedUser = {
                    ...user,
                    bio: profile.bio,
                    goal: profile.goal,
                    location: profile.location,
                    age: profile.age,
                    experience: profile.experience,
                    gender: profile.gender
                };
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
        <div className="profile-page">
            <Nav />
            <div className="profile-container">
                <h1>Your Profile</h1>
                {error && <div className="error-message">{error}</div>}

                {editing ? (
                    <div className="profile-edit">
                        <div className="input-group">
                            <label>Bio:</label>
                            <textarea
                                value={profile.bio || ''}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                placeholder="Tell us about yourself..."
                                className="profile-textarea"
                            />
                        </div>
                        <div className="input-group">
                            <label>Goal:</label>
                            <textarea
                                value={profile.goal || ''}
                                onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                                placeholder="What's your fitness goal?"
                                className="profile-textarea"
                            />
                        </div>
                        <div className="input-group">
                            <label>Location:</label>
                            <textarea
                                value={profile.location || ''}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                placeholder="Which city do you live in?"
                                className="profile-textarea"
                            />
                        </div>
                        <div className="input-group">
                            <label>Age:</label>
                            <textarea
                                value={profile.age || ''}
                                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                placeholder="What's your age?"
                                className="profile-textarea"
                            />
                        </div>
                        <div className="dropdown">
                            <label>Experience:</label>
                            <select
                                value={profile.experience || ''}
                                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                                className="profile-dropdown"
                            >
                                <option value="">Select Experience Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                        <div className="dropdown">
                            <label>Gender:</label>
                            <select
                                value={profile.gender || ''}
                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                className="profile-dropdown"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="button-group">
                            <button onClick={handleProfileUpdate} className="save-button">
                                Save Profile
                            </button>
                            <button onClick={() => setEditing(false)} className="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-view">
                        <div className="profile-section">
                            <h3>Name</h3>
                            <p>{user.name}</p>
                        </div>
                        <div className="profile-section">
                            <h3>Email</h3>
                            <p>{user.email}</p>
                        </div>
                        <div className="profile-section">
                            <h3>Bio</h3>
                            <p>{user.bio || 'No bio yet'}</p>
                        </div>
                        <div className="profile-section">
                            <h3>Goal</h3>
                            <p>{user.goal || 'No goal set'}</p>
                        </div>
                        <div className="profile-section">
                            <h3>Location</h3>
                            <p>{user.location || 'No location yet'}</p>
                        </div>
                        <div className="profile-section">
                            <h3>Age</h3>
                            <p>{user.age || 'No age yet'}</p>
                        </div>
                        <div className="profile-section">
                            <h3>Experience</h3>
                            <p>{user.experience || 'No experience yet'}</p>
                        </div>
                        <div className="profile-section">
                            <h3>Gender</h3>
                            <p>{user.gender || 'No gender yet'}</p>
                        </div>
                        <button onClick={() => setEditing(true)} className="edit-button">
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
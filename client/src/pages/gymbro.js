import React, { useState, useEffect } from 'react';
import { Activity, MapPin, Target } from 'lucide-react';
import '../styles/gymbro.css';
import Nav from '../components/Nav';
import LeftButton from '../components/LeftButton';
import RightButton from '../components/RightButton';

function Gymbro() {
    const [friends, setFriends] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);

    // Fetch gymbros from the database on component mount
    useEffect(() => {
        const fetchGymbros = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/recommendations');
                const data = await response.json();
                setRecommendations(data);
            } catch (error) {
                console.error('Fetch gymbros error:', error);
                setError(`Failed to load gymbros: ${error.message}`);
            }
        };

        fetchGymbros();
    }, []);


    // Handle rejecting a user (removing from recommendations)
    const handleReject = (uuid) => {
        setRecommendations(prev => prev.filter(user => user.uuid !== uuid));
    };

    // Handle accepting a user (adding to friends)
    const handleAccept = (user) => {
        setFriends(prev => [...prev, user]);
        setRecommendations(prev => prev.filter(rec => rec.uuid !== user.uuid));
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="gymbroContainer">
            <Nav />
            <div className="sidebar">
                <h3>Gymbros</h3>
                <ul>
                    {friends.map((friend, index) => (
                        <li key={index}>
                            <img src={friend.img || 'default-image.jpg'} alt={`${friend.name}'s profile`} className="profileImage" />
                            {friend.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="gymbroBody">
                <div className="cardStack">
                    {recommendations.map((user, index) => (
                        <div key={user.uuid} className="card">

                            <div className="profile-section">
                                <div className="profile-image-container">
                                    <img
                                        src={user.img || 'default-image.jpg'}
                                        alt={user.name}
                                        className="profile-image"
                                    />
                                </div>

                                <div className="card-info">
                                    <div className="user-header">
                                        <h2>{user.name}, {user.age}</h2>
                                        <div className="status">
                                            <span className="status-dot"></span>
                                            <span>{user.bio}</span>
                                        </div>
                                    </div>

                                    <div className="stats-grid">
                                        <div className="stat-box">
                                            <div className="stat-title">
                                                <Activity size={18} />
                                                <span>Experience</span>
                                            </div>
                                            <p>{user.experience}</p>
                                        </div>
                                        <div className="stat-box">
                                            <div className="stat-title">
                                                <Target size={18} />
                                                <span>Goal</span>
                                            </div>
                                            <p>{user.goal}</p>
                                        </div>
                                    </div>

                                    <div className="location">
                                        <MapPin size={18} />
                                        <span>{user.location}</span>
                                    </div>



                                    <div className="button-div">
                                        <LeftButton onReject={() => handleReject(user.uuid)} />
                                        <RightButton onAccept={() => handleAccept(user)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gymbro;
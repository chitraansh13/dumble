import React, { useState, useEffect } from 'react';
import { X, } from 'lucide-react';
import '../styles/gymbro.css';
import Nav from '../components/Nav';
import RightButton from '../components/RightButton';
import LeftButton from '../components/LeftButton';

function Gymbro() {
    const [friends, setFriends] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);

    // Fetch gymbros from the database on component mount
    useEffect(() => {
        const fetchGymbros = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/recommendations');
                if (!response.ok) {
                    throw new Error('Failed to fetch gymbros');
                }
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
        return <div className="error-message p-4 text-red-500">{error}</div>;
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
                            <div className="cardImage" style={{ backgroundImage: `url(${user.img || 'default-image.jpg'})` }}></div>
                            <div className="cardInfo">
                                <h2>{user.name}</h2>
                                <p>{user.bio || 'No bio available'}</p>
                                <p>Goal: {user.goal || 'No goal specified'}</p>
                                <p>Location: {user.location || 'Location not provided'}</p>

                                <div className="button-div">
                                    <LeftButton onReject={handleReject} userId={user.uuid} />
                                    <RightButton onAccept={handleAccept} user={user} />
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
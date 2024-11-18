import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import '../styles/gymbro.css';
import Nav from '../components/Nav';

function Gymbro() {
    const [friends, setFriends] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const x = useMotionValue(0);
    const background = useTransform(x, [-100, 0, 100], ["#ff0000", "#383938", "#00ab00"]);

    // Fetch gymbros from the database on component mount
    useEffect(() => {
        const fetchGymbros = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/recommendations');
                if (!response.ok) {
                    throw new Error('Failed to fetch gymbros');
                }
                const data = await response.json();
                setRecommendations(data); // Set fetched gymbros as recommendations
            } catch (error) {
                console.error('Fetch gymbros error:', error);
                setError(`Failed to load gymbros: ${error.message}`);
            }
        };

        fetchGymbros();
    }, []);

    const handleSwipe = (user, direction) => {
        if (direction === "right") {
            setFriends([...friends, user]);
        }
        setRecommendations(recommendations.filter((u) => u.uuid !== user.uuid));
        x.set(0);
    };

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
                {error && <div className="error-message">{error}</div>}
                <motion.div className="cardStack">
                    {recommendations.map((user, index) => (
                        <motion.div
                            key={user.uuid}
                            className="card"
                            style={{ x, background }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, info) => {
                                if (info.offset.x > 100) handleSwipe(user, "right");
                                if (info.offset.x < -100) handleSwipe(user, "left");
                            }}
                        >
                            <div className="cardImage" style={{ backgroundImage: `url(${user.img || 'default-image.jpg'})` }}></div>
                            <div className="cardInfo">
                                <h2>{user.name}</h2>
                                <p>{user.bio || 'No bio available'}</p>
                                <p>Goal: {user.goal || 'No goal specified'}</p>
                                <p>Location: {user.location || 'Location not provided'}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Gymbro;

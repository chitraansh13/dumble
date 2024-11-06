import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './gymbro.css';

function Gymbro() {
    const [friends, setFriends] = useState([]);
    const [recommendations, setRecommendations] = useState([
        { id: 1, name: "Alex", bio: "Gym lover and fitness freak", img: "/public/alex.jpg" },
        { id: 2, name: "Jordan", bio: "Powerlifting enthusiast", img: "/public/jordan.jpg" },
        { id: 3, name: "Taylor", bio: "Yoga and wellness advocate", img: "/public/taylor.jpg" },
    ]);
    const x = useMotionValue(0);
    const background = useTransform(x, [-100, 0, 100], ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]);

    const handleSwipe = (user, direction) => {
        if (direction === "right") {
            setFriends([...friends, user]);
        }
        setRecommendations(recommendations.filter((u) => u.id !== user.id));
        x.set(0); // Reset position after swipe
    };

    return (
        <div className="gymbroContainer">
            <div className="sidebar">
                <h3>Gymbros</h3>
                <ul>
                    {friends.map((friend, index) => (
                        <li key={index}>
                            <img src={friend.img} alt={`${friend.name}'s profile`} className="profileImage" />
                            {friend.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="gymbroBody">
                <motion.div className="cardStack">
                    {recommendations.map((user, index) => (
                        <motion.div
                            key={user.id}
                            className="card"
                            style={{ x, background }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, info) => {
                                if (info.offset.x > 100) handleSwipe(user, "right");
                                if (info.offset.x < -100) handleSwipe(user, "left");
                            }}
                        >
                            <div className="cardImage" style={{ backgroundImage: `url(${user.img})` }}></div>
                            <div className="cardInfo">
                                <h2>{user.name}</h2>
                                <p>{user.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Gymbro;

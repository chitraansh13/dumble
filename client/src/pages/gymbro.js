import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './gymbro.css';

function Gymbro() {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-100, 100], [-10, 10]);

    const handleSwipeLeft = () => {
        x.set(-300); // Swipe left
    };

    const handleSwipeRight = () => {
        x.set(300); // Swipe right
        // Logic to add user to friends list
    };

    return (
        <div className="gymbroBody">
            <div className="cardStack">
                <motion.div
                    className="card"
                    style={{ x, rotate }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    whileTap={{ cursor: "grabbing" }}
                >
                    <div className="cardImage"></div>
                    <div className="cardInfo">
                        <h2>User Name</h2>
                        <p>Bio: Enthusiastic gym-goer and fitness lover.</p>
                        <div className="actionButtons">
                            <button onClick={handleSwipeLeft} className="crossButton">✖</button>
                            <button onClick={handleSwipeRight} className="tickButton">✔</button>
                        </div>
                    </div>
                </motion.div>
                {/* You can add extra cards here for the stacked effect */}
                <div className="card cardBehind" />
                <div className="card cardBehind" />
            </div>
        </div>
    );
}

export default Gymbro;

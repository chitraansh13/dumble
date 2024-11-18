import React from 'react';
import './FriendsCard.css';

const FriendsCard = ({ title, value, unit, change, subtitle, icon }) => {
    return (
        <div className="friends-card">
            <div className="friends-header">
                <h3>{title}</h3>
                <span className="icon">{icon}</span>
            </div>
            <div className="friends-value">
                <h2>{value}</h2>
                {unit && <span className="unit">{unit}</span>}
                <span className="change">{change}</span>
            </div>
            <p className="subtitle">{subtitle}</p>
        </div>
    );
};

export default FriendsCard;
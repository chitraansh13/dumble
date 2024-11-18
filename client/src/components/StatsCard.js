import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, unit, change, subtitle, icon }) => {
    return (
        <div className="stats-card">
            <div className="stats-header">
                <h3>{title}</h3>
                <span className="icon">{icon}</span>
            </div>
            <div className="stats-value">
                <h2>{value}</h2>
                {unit && <span className="unit">{unit}</span>}
                <span className="change">{change}</span>
            </div>
            <p className="subtitle">{subtitle}</p>
        </div>
    );
};

export default StatsCard;
import React from 'react';
import './WorkoutCard.css';

const ClockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
    </svg>
);

const WeightIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20.94 15a8.12 8.12 0 0 1-1.46 2.75M19.48 17.75A8 8 0 1 1 7.78 4.55" />
        <path d="M21 11a8.12 8.12 0 0 0-1.46-2.75M19.48 8.25A8 8 0 1 0 7.78 21.45" />
        <path d="M15 13V7" />
        <path d="M9 13V7" />
        <path d="M9 7h6" />
    </svg>
);

const WorkoutCard = ({ tag, title, count, weight, duration }) => {
    return (
        <div className="workout-card">
            <span className={`tag ${tag.toLowerCase()}`}>#{tag}</span>
            <h3>{title}</h3>
            <div className="count">Count: {count}</div>
            <div className="workout-meta">
                <div className="meta-item">
                    <WeightIcon />
                    <span>{weight} kg</span>
                </div>
                <div className="meta-item">
                    <ClockIcon />
                    <span>{duration} min</span>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCard;
import React from 'react';
import './WorkoutCard.css';

const muscleColors = {
    legs: '#a5d0f4',
    chest: '#417096',
    arms: '#634a37',
    back: '#6aab6d',
    shoulder: '#febd5d',
    shoulders: '#febd5d', // Adding an alternate spelling
    abs: '#e35d8a',
    biceps: '#634a37',    // Adding more specific muscle groups
    triceps: '#7a5b46',
    quadriceps: '#a5d0f4',
    hamstrings: '#8fb8e0',
    calves: '#c4ddf7',
    core: '#e35d8a',
    lats: '#6aab6d',
    traps: '#5a9b5d',
    delts: '#febd5d',
    forearms: '#634a37',
    glutes: '#a5d0f4',
    default: '#61dafb'    // Default color if muscle group isn't found
};

const WorkoutCard = ({ tag, title }) => {
    const normalizedTag = tag?.toLowerCase().trim();
    
    // Get the color from our mapping or use default
    const getTagStyle = () => ({
        backgroundColor: muscleColors[normalizedTag] || muscleColors.default
    });

    return (
        <div className="workout-card">
            <span 
                className="tag" 
                style={getTagStyle()}
            >
                #{tag}
            </span>
            <h3>{title}</h3>
        </div>
    );
};

export default WorkoutCard;
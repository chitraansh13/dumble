import React from 'react';
import './DietCard.css';

const mealColors = {
    breakfast: '#ffd700',    // Golden yellow for breakfast
    lunch: '#ff7f50',        // Coral for lunch
    dinner: '#9370db',       // Purple for dinner
    snack: '#98fb98',        // Pale green for snacks
    default: '#61dafb'       // Default blue if meal type isn't found
};

const DietCard = ({ mealType, foodItem, calories }) => {
    const normalizedMealType = mealType?.toLowerCase().trim();
    
    // Get the color from our mapping or use default
    const getMealTypeStyle = () => ({
        backgroundColor: mealColors[normalizedMealType] || mealColors.default
    });

    // Determine text color based on background brightness
    const getTextColor = (backgroundColor) => {
        // Convert hex to RGB
        const hex = backgroundColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        // Calculate brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // Return white for dark backgrounds, black for light backgrounds
        return brightness > 128 ? '#000000' : '#ffffff';
    };

    const backgroundColor = mealColors[normalizedMealType] || mealColors.default;
    const textColor = getTextColor(backgroundColor);

    return (
        <div className="diet-card">
            <div className="diet-card-header">
                <span 
                    className="meal-type"
                    style={{
                        ...getMealTypeStyle(),
                        color: textColor
                    }}
                >
                    {mealType}
                </span>
                <span className="calories">{calories} cal</span>
            </div>
            <div className="diet-card-body">
                <p className="food-item">{foodItem}</p>
            </div>
        </div>
    );
};

export default DietCard;
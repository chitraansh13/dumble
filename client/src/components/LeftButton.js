import React from 'react';
import './LeftButton.css';

const LeftButton = ({ onReject, userId }) => {
    return (
        <button
            type="button"
            className="left-button"
            onClick={() => onReject(userId)}
        >
            Skip
        </button>
    );
};

export default LeftButton;
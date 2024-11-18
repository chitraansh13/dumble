// RightButton.js
import React from 'react';
import './RightButton.css';

const RightButton = ({ onAccept, user }) => {
    return (
        <button
            type="button"
            className="right-button"
            onClick={() => onAccept(user)}
        >
            Accept
            <svg
                className="tick-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M20.293 5.293a1 1 0 0 1 1.414 1.414l-12 12a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L9 16.586l10.293-11.293z" />
            </svg>
        </button>
    );
};

export default RightButton;
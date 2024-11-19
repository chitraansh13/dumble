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
        </button>
    );
};

export default RightButton;
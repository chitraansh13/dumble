import React from 'react';
import './LeftButton.css';

const LeftButton = ({ onReject, userId }) => {
    return (
        <button
            type="button"
            className="left-button"
            onClick={() => onReject(userId)}
        >
            Reject
            <svg
                className="x-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 0-1.414z" />
            </svg>
        </button>
    );
};

export default LeftButton;
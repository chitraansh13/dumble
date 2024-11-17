import React from 'react';
import './AddWorkout.css';

const AddWorkout = () => {
    return (
        <div className="add-workout">
            <h3>Add New Workout</h3>
            <div className="workout-form">
                <textarea
                    className="workout-input"
                    placeholder="Enter workout details..."
                    defaultValue="#Legs&#10;- Back Squat&#10;- 5 sets×15 reps&#10;- 30 kg&#10;- 10 min"
                />
                <button className="add-button">Add Workout</button>
            </div>
        </div>
    );
};

export default AddWorkout;
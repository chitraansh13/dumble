import React from 'react';
import Nav from '../components/Nav';
import Calendar from '../components/Calendar';
import WorkoutCard from '../components/WorkoutCard';
import AddWorkout from '../components/AddWorkout';
import './workoutPage.css';

const WorkoutPage = () => {
    const workouts = [
        { tag: 'Legs', title: 'Back Squat', count: '5 sets x 15 reps', weight: 30, duration: 10 },
        { tag: 'Back', title: 'Lat Pulldown', count: '5 sets x 15 reps', weight: 30, duration: 10 },
        { tag: 'Legs', title: 'Squat', count: '5 sets x 15 reps', weight: 30, duration: 20 },
        { tag: 'Shoulder', title: 'Shoulder Press', count: '5 sets x 15 reps', weight: 30, duration: 25 },
        { tag: 'ABS', title: 'Crunches', count: '5 sets x 15 reps', weight: 30, duration: 15 },
        { tag: 'Legs', title: 'Back Squat', count: '5 sets x 15 reps', weight: 30, duration: 10 }
    ];

    return (
        <div className="workout-page">
            <Nav />
            <div className="workout-content">
                <div className="calendar-section">
                    <h2>Select Date</h2>
                    <Calendar />
                    <h2>Todays Routine</h2>
                    <div className="workout-grid">
                        {workouts.map((workout, index) => (
                            <WorkoutCard key={index} {...workout} />
                        ))}
                    </div>
                </div>
                <div className="workouts-section">
                    <h2>Todays Workouts</h2>
                    <div className="workout-grid">
                        {workouts.map((workout, index) => (
                            <WorkoutCard key={index} {...workout} />
                        ))}
                    </div>
                    <div className="charts-container">

                        <AddWorkout />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPage;
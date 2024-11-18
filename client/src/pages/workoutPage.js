import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Calendar from '../components/Calendar';
import WorkoutCard from '../components/WorkoutCard';
import DietCard from '../components/DietCard';
import './workoutPage.css';

const WorkoutPage = () => {
    const [exercises, setExercises] = useState([]);
    const [dietEntries, setDietEntries] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

                // Fetch Exercises
                const exercisesResponse = await fetch(`http://localhost:3001/api/users/${user.uuid}/exercises`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!exercisesResponse.ok) {
                    throw new Error('Failed to fetch exercises');
                }

                const allExercises = await exercisesResponse.json();
                const dayExercises = allExercises.filter(exercise => exercise.day === formattedDate);
                setExercises(dayExercises);

                // Fetch Diet Entries
                const dietResponse = await fetch(`http://localhost:3001/api/users/${user.uuid}/diet`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!dietResponse.ok) {
                    throw new Error('Failed to fetch diet entries');
                }

                const allDietEntries = await dietResponse.json();
                const dayDietEntries = allDietEntries.filter(entry => entry.day === formattedDate);
                setDietEntries(dayDietEntries);

                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Could not load exercises and diet entries');
                setExercises([]);
                setDietEntries([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedDate]);

    // Calculate total calories for the day
    const totalCalories = dietEntries.reduce((total, entry) => total + (entry.calories || 0), 0);

    return (
        <div className="workout-page">
            <Nav />
            <div className="workout-content">
                <div className="calendar-section">
                    <h2>Select Date</h2>
                    <Calendar onDateSelect={setSelectedDate} />
                </div>
                <div className="workouts-section">
                    <h2>Today's Routine</h2>
                    {isLoading ? (
                        <div className="loading">Loading exercises...</div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : exercises.length === 0 ? (
                        <div className="no-workouts">No exercises for this day</div>
                    ) : (
                        <div className="workout-grid">
                            {exercises.map((exercise, index) => (
                                <WorkoutCard 
                                    key={index} 
                                    tag={exercise.muscle}
                                    title={exercise.name}
                                />
                            ))}
                        </div>
                    )}
                    <div className="diet-section">
                        <div className="diet-header">
                            <h2>Today's Diet</h2>
                            <div className="calories-card">
                                <span className="calories-label">Total Calories</span>
                                <span className="calories-value">{totalCalories}</span>
                            </div>
                        </div>
                        {isLoading ? (
                            <div className="loading">Loading diet entries...</div>
                        ) : error ? (
                            <div className="error-message">{error}</div>
                        ) : dietEntries.length === 0 ? (
                            <div className="no-diet-entries">No diet entries for this day</div>
                        ) : (
                            <div className="diet-grid">
                                {dietEntries.map((entry, index) => (
                                    <DietCard 
                                        key={index} 
                                        mealType={entry.mealType}
                                        foodItem={entry.foodItem}
                                        calories={entry.calories}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPage;

import React, { useState, useEffect } from 'react';

const MakeYourRoutine = () => {
  const [day, setDay] = useState('');
  const [muscle, setMuscle] = useState('');
  const [exercise, setExercise] = useState('');
  const [exercises, setExercises] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    if (loggedInUser) fetchExercises(loggedInUser.uuid);
  }, []);

  const fetchExercises = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/exercises`);
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Fetch exercises error:', error);
      setError('Failed to load exercises.');
    }
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('User not logged in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${user.uuid}/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ day, muscle, name: exercise }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add exercise');
      } else {
        const updatedExercises = await response.json();
        setExercises(updatedExercises);
        setDay('');
        setMuscle('');
        setExercise('');
        setError('');
      }
    } catch (error) {
      console.error('Add exercise error:', error);
      setError('Failed to add exercise.');
    }
  };

  return (
    <div>
      <h1>Make Your Routine</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleAddExercise}>
        <label>
          Choose your day:
          <input type="text" value={day} onChange={(e) => setDay(e.target.value)} />
        </label>
        <label>
          Choose which muscle:
          <input type="text" value={muscle} onChange={(e) => setMuscle(e.target.value)} />
        </label>
        <label>
          Name of the Exercise:
          <input type="text" value={exercise} onChange={(e) => setExercise(e.target.value)} />
        </label>
        <button type="submit">Add Exercise</button>
      </form>
      <h2>Your Exercises</h2>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            Day: {exercise.day}, Muscle: {exercise.muscle}, Name: {exercise.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MakeYourRoutine;

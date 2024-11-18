import React, { useState, useEffect } from 'react';
import '../styles/dietRoutine.css';

const DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
  'Friday', 'Saturday', 'Sunday'
];

const MEAL_TYPES = [
  'Breakfast', 'Lunch', 'Snack', 'Dinner'
];

const MakeYourDiet = () => {
  const [day, setDay] = useState('');
  const [mealType, setMealType] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [dietEntries, setDietEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    if (loggedInUser) fetchDietEntries(loggedInUser.uuid);
  }, []);

  const fetchDietEntries = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/diet`);
      if (!response.ok) {
        throw new Error('Failed to fetch diet entries');
      }
      const data = await response.json();
      setDietEntries(data);
    } catch (error) {
      console.error('Fetch diet entries error:', error);
      setError('Failed to load diet entries.');
    }
  };

  const handleAddDietEntry = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('User not logged in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/${user.uuid}/diet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ day, mealType, foodItem, calories: Number(calories) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add diet entry');
      } else {
        const updatedDietEntries = await response.json();
        setDietEntries(updatedDietEntries);
        setDay('');
        setMealType('');
        setFoodItem('');
        setCalories('');
        setError('');
      }
    } catch (error) {
      console.error('Add diet entry error:', error);
      setError('Failed to add diet entry.');
    }
  };

  return (
    <div className="diet-container">
      <h1>Make Your Diet Plan</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleAddDietEntry} className="diet-form">
        <label>
          Choose your day:
          <select 
            value={day} 
            onChange={(e) => setDay(e.target.value)} 
            required
          >
            <option value="">Select Day</option>
            {DAYS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          Choose meal type:
          <select 
            value={mealType} 
            onChange={(e) => setMealType(e.target.value)} 
            required
          >
            <option value="">Select Meal Type</option>
            {MEAL_TYPES.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <label>
          Food Item:
          <input 
            type="text" 
            placeholder="e.g., Grilled Chicken Salad" 
            value={foodItem} 
            onChange={(e) => setFoodItem(e.target.value)} 
            required 
          />
        </label>
        <label>
          Calories:
          <input 
            type="number" 
            placeholder="Calories" 
            value={calories} 
            onChange={(e) => setCalories(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Add Diet Entry</button>
      </form>
      <h2>Your Diet Plan</h2>
      <div className="diet-entries-list">
        <ul>
          {dietEntries.map((entry, index) => (
            <li key={index}>
              Day: {entry.day}, Meal: {entry.mealType}, 
              Food: {entry.foodItem}, Calories: {entry.calories}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MakeYourDiet;
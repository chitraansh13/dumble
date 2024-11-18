import React, { useState, useEffect } from 'react';
import '../styles/dietRoutine.css';

const DAYS = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
  'Friday', 'Saturday', 'Sunday'
];

const MakeYourDiet = () => {
  const [day, setDay] = useState('');
  const [mealType, setMealType] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [calories, setCalories] = useState('');
  const [dietEntries, setDietEntries] = useState([]);
  const [filteredDay, setFilteredDay] = useState('');
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

  const handleDayFilterChange = (e) => {
    setFilteredDay(e.target.value);
  };

  const filteredEntries = filteredDay 
    ? dietEntries.filter(entry => entry.day === filteredDay) 
    : [];

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
            {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map(m => (
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
      <label className="filter-day">
        Filter by Day:
        <select value={filteredDay} onChange={handleDayFilterChange}>
          <option value="">Select Day</option>
          {DAYS.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>
      <div className="diet-entries-list">
        {filteredEntries.length === 0 && filteredDay ? (
          <p className="no-entries-message">No entries for {filteredDay}</p>
        ) : (
          <ul className="diet-list">
            {filteredEntries.map((entry, index) => (
              <li key={index} className="diet-item">
                <div className="diet-meal-type">{entry.mealType}</div>
                <div className="diet-food-item">{entry.foodItem}</div>
                <div className="diet-calories">{entry.calories} kcal</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MakeYourDiet;

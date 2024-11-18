import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Register from './pages/register';
import Login from './pages/login';
import Gymbro from './pages/gymbro';
import HomePage from './pages/homePage';
import MakeYourRoutine from './pages/MakeYourRoutine';
import WorkoutPage from './pages/workoutPage';
import MakeYourDiet from './pages/diet';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gymbro" element={<Gymbro />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/workout-routine" element={<MakeYourRoutine />} />
                <Route path="/workoutPage" element={<WorkoutPage />} />
                <Route path="/diet" element={<MakeYourDiet />} />
            </Routes>
        </Router>
    );
}

export default App;

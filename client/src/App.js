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
import ProfilePage from './pages/profile';
import ContactPage from './pages/contact';

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
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </Router>
    );
}

export default App;

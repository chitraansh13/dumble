import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="/logo512.png" alt="Fittrack" className="logo" />
            </div>
            <div className="navbar-center">
                <a href="/home" className="active">Home</a>
                <a href="/workoutPage">Workouts</a>
                <a href="/gymbro">Gymbros</a>
                <a href="/contact">Contact Us</a>
                <a href="/profile">Profile</a>
            </div>
            <div className="navbar-right">
                <img src="/avatar.jpg" alt="Profile" className="avatar" />
                <a href="#" onClick={handleLogout} className="logout">Logout</a>
            </div>
        </nav>
    );
};

export default Nav;

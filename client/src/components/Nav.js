import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    const [user, setUser] = useState(null);
    //const [editing, setEditing] = useState(false);
    //const [profile, setProfile] = useState({
    //    bio: '',
    //    goal: ''
    // });
    // const [error, setError] = useState('');
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
            </div>
            <div className="navbar-right">
                <img src="/avatar.jpg" alt="Profile" className="avatar" />
                <a href="#" onClick={handleLogout} className="logout">Logout</a>
            </div>
        </nav>
    );
};

export default Nav;
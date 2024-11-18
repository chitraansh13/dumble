import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import StatsCard from '../components/StatsCard';
import FriendsCard from '../components/FriendsCard';
import '../styles/dashboard.css'; 

const HomePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (!loggedInUser) {
            navigate('/login');
            return;
        }
        const userData = JSON.parse(loggedInUser);
        setUser(userData);
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="app">
            <Nav />
            <div className="dashboard">
                <h2 className='intro-text'>Hi, {user.name}!</h2>
                <br/>
                <div className="stats-container">
                    <Link to="/diet" className="card-link">
                        <StatsCard
                            title="Diet Page"
                            value="Your Diet"
                            subtitle="Track your nutrition and meal plans"
                            icon="🔥"
                        />
                    </Link>
                    <Link to="/track-workout" className="card-link">
                        <StatsCard
                            title="Track Workout"
                            value="Log"
                            subtitle="Monitor your exercises"
                            icon="💪"
                        />
                    </Link>
                    <Link to="/workout-routine" className="card-link">
                        <StatsCard
                            title="Workout Routine"
                            value="Plan"
                            subtitle="View and create workout routines"
                            icon="📝"
                        />
                    </Link>
                </div>
                <div className="charts-container">
                    <Link to="/challenges" className="card-link">
                        <FriendsCard
                            title="Challenges"
                            value="Compete"
                            subtitle="Take on challenges with friends"
                            icon="🏆"
                        />
                    </Link>
                    <Link to="/gymbro" className="card-link">
                        <FriendsCard
                            title="Gym Bro"
                            value="Find"
                            subtitle="Meet workout partners"
                            icon="🤝"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

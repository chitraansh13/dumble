import React from 'react';
import Nav from '../components/Nav';
import StatsCard from '../components/StatsCard';
import FriendsCard from '../components/FriendsCard';
//import WeeklyChart from '../components/WeeklyChart';
//import WorkoutCategories from '../components/WorkoutCategories';
import AddWorkout from '../components/AddWorkout';
import './dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="app">
            <Nav />
            <div className="dashboard">
                <h1>Dashboard</h1>
                <div className="stats-container">
                    <Link to='/diet' className='card-link'>
                        <StatsCard
                            title="Diet Page"
                            value="12000.00"
                            unit="kcal"
                            change="+10%"
                            subtitle="Track your nutrition and meal plans"
                            icon="🔥"
                        />
                    </Link>
                    <Link to='/workoutPage' className='card-link'>
                        <StatsCard
                            title="Track Workout"
                            value="5.00"
                            change="+10%"
                            subtitle="Log and monitor your workout"
                            icon="↔️"
                        />
                    </Link>
                    <Link to='/workout-routine' className='card-link'>
                        <StatsCard
                            title="Create Workout Routine"
                            value="2400.00"
                            unit="kcal"
                            change="+10%"
                            subtitle="View and plan your workout routines"
                            icon="↔️"
                        />
                    </Link>


                </div>
                <div className="charts-container">
                    <Link to='/challenges' className='card-link'>
                        <FriendsCard
                            title="Challenges"
                            value="2400.00"
                            unit="kcal"
                            change="+10%"
                            subtitle="Take on fitness challenges with your Gym Partners"
                            icon="↔️"
                        />
                    </Link>
                    <Link to='/gymbro' className='card-link'>
                        <FriendsCard
                            title="Find Gym Partner"
                            value="2400.00"
                            unit="kcal"
                            change="+10%"
                            subtitle="Meet Gym partners on Dumble"
                            icon="↔️"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
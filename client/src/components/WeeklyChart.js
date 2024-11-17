import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './WeeklyChart.css';

const WeeklyChart = () => {
    const data = [
        { date: '17th', calories: 10000 },
        { date: '18th', calories: 0 },
        { date: '19th', calories: 0 },
        { date: '20th', calories: 0 },
        { date: '21th', calories: 0 },
        { date: '22th', calories: 0 },
        { date: '23th', calories: 11500 },
    ];

    return (
        <div className="weekly-chart">
            <h3>Weekly Calories Burned</h3>
            <div className="chart-container">
                <BarChart
                    width={400}
                    height={250}
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calories" fill="#00BCD4" />
                </BarChart>
            </div>
        </div>
    );
};

export default WeeklyChart;
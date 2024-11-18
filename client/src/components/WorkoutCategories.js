import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import './WorkoutCategories.css';

const WorkoutCategories = () => {
    const data = [
        { name: 'Shoulder', value: 30 },
        { name: 'Back', value: 15 },
        { name: 'ABS', value: 25 },
        { name: 'Legs', value: 30 },
    ];

    const COLORS = ['#00BCD4', '#2196F3', '#E91E63', '#673AB7'];

    return (
        <div className="workout-categories">
            <h3>Workout Categories</h3>
            <div className="chart-container">
                <PieChart width={300} height={250}>
                    <Pie
                        data={data}
                        cx={150}
                        cy={120}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default WorkoutCategories;
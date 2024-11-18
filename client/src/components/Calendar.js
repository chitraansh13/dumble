import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(currentDate.getDate());

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="month-selector">
                    <span>
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <div className="month-nav">
                        <button className="nav-btn" onClick={() => changeMonth(-1)}>‹</button>
                        <button className="nav-btn" onClick={() => changeMonth(1)}>›</button>
                    </div>
                </div>
            </div>
            <div className="weekdays">
                {days.map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>
            <div className="dates">
                {Array(firstDayOfMonth).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} className="date empty"></div>
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(date => (
                    <div
                        key={date}
                        className={`date ${
                            date === selectedDate && 
                            currentDate.getMonth() === new Date().getMonth() && 
                            currentDate.getFullYear() === new Date().getFullYear() 
                                ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedDate(date)}
                    >
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;

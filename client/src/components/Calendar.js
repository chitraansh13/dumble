import React from 'react';
import './Calendar.css';

const Calendar = () => {
    const month = "March 2024";
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dates = Array.from({ length: 31 }, (_, i) => i + 1);
    const selectedDate = 23;

    return (
        <div className="calendar">
            <div className="calendar-header">
                <div className="month-selector">
                    <span>{month}</span>
                    <div className="month-nav">
                        <button className="nav-btn">‹</button>
                        <button className="nav-btn">›</button>
                    </div>
                </div>
            </div>
            <div className="weekdays">
                {days.map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>
            <div className="dates">
                {/* Add empty cells for alignment */}
                {Array(5).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} className="date empty"></div>
                ))}
                {dates.map(date => (
                    <div
                        key={date}
                        className={`date ${date === selectedDate ? 'selected' : ''}`}
                    >
                        {date}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
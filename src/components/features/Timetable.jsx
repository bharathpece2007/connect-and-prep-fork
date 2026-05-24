import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import '../features/FeatureStyles.css';

const Timetable = () => {
    const [view, setView] = useState('daily');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const todayIndex = today.getDay() - 1; // 0 = Monday
    const [selectedDay, setSelectedDay] = useState(Math.max(0, Math.min(todayIndex, 5)));
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 30000);
        return () => clearInterval(timer);
    }, []);

    const handleDateChange = (e) => {
        const dateStr = e.target.value;
        if (!dateStr) return;
        const d = new Date(dateStr);
        let dayIdx = d.getDay() - 1; // 0 = Monday, 5 = Saturday
        if (dayIdx < 0) dayIdx = 0; // If Sunday, default to Monday
        setSelectedDay(dayIdx);
    };

    const schedule = {
        Monday: [
            { period: 1, time: '8:00 - 8:45', subject: 'Mathematics', teacher: 'Mrs. Sharma', type: 'lecture', assignment: 'Ch 7 Ex 4.2' },
            { period: 2, time: '8:45 - 9:30', subject: 'Science', teacher: 'Mr. Patel', type: 'lecture' },
            { period: 3, time: '9:30 - 10:15', subject: 'English', teacher: 'Ms. Gupta', type: 'lecture', assignment: 'Sonnet Essay Draft' },
            { period: 0, time: '10:15 - 10:30', subject: 'RECESS', teacher: '', type: 'recess' },
            { period: 4, time: '10:30 - 11:15', subject: 'Social Studies', teacher: 'Mr. Khan', type: 'lecture' },
            { period: 5, time: '11:15 - 12:00', subject: 'Hindi', teacher: 'Mrs. Devi', type: 'lecture' },
            { period: 6, time: '12:00 - 12:45', subject: 'Computer Science', teacher: 'Mr. Reddy', type: 'lab' },
            { period: 0, time: '12:45 - 1:30', subject: 'LUNCH BREAK', teacher: '', type: 'recess' },
            { period: 7, time: '1:30 - 2:15', subject: 'Physical Education', teacher: 'Coach Verma', type: 'activity' },
            { period: 8, time: '2:15 - 3:00', subject: 'Art & Craft', teacher: 'Ms. Rao', type: 'activity' },
        ],
        Tuesday: [
            { period: 1, time: '8:00 - 8:45', subject: 'Science', teacher: 'Mr. Patel', type: 'lecture', assignment: 'Lab Report' },
            { period: 2, time: '8:45 - 9:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', type: 'lecture' },
            { period: 3, time: '9:30 - 10:15', subject: 'Hindi', teacher: 'Mrs. Devi', type: 'lecture' },
            { period: 0, time: '10:15 - 10:30', subject: 'RECESS', teacher: '', type: 'recess' },
            { period: 4, time: '10:30 - 11:15', subject: 'English', teacher: 'Ms. Gupta', type: 'lecture' },
            { period: 5, time: '11:15 - 12:00', subject: 'Social Studies', teacher: 'Mr. Khan', type: 'lecture' },
            { period: 6, time: '12:00 - 12:45', subject: 'Science Lab', teacher: 'Mr. Patel', type: 'lab' },
            { period: 0, time: '12:45 - 1:30', subject: 'LUNCH BREAK', teacher: '', type: 'recess' },
            { period: 7, time: '1:30 - 2:15', subject: 'Computer Science', teacher: 'Mr. Reddy', type: 'lab', assignment: 'React Hook Setup' },
            { period: 8, time: '2:15 - 3:00', subject: 'Music', teacher: 'Mrs. Nair', type: 'activity' },
        ],
        Wednesday: [
            { period: 1, time: '8:00 - 8:45', subject: 'English', teacher: 'Ms. Gupta', type: 'lecture' },
            { period: 2, time: '8:45 - 9:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', type: 'lecture' },
            { period: 3, time: '9:30 - 10:15', subject: 'Science', teacher: 'Mr. Patel', type: 'lecture' },
            { period: 0, time: '10:15 - 10:30', subject: 'RECESS', teacher: '', type: 'recess' },
            { period: 4, time: '10:30 - 11:15', subject: 'Hindi', teacher: 'Mrs. Devi', type: 'lecture' },
            { period: 5, time: '11:15 - 12:00', subject: 'Computer Science', teacher: 'Mr. Reddy', type: 'lab' },
            { period: 6, time: '12:00 - 12:45', subject: 'Social Studies', teacher: 'Mr. Khan', type: 'lecture' },
            { period: 0, time: '12:45 - 1:30', subject: 'LUNCH BREAK', teacher: '', type: 'recess' },
            { period: 7, time: '1:30 - 2:15', subject: 'Art & Craft', teacher: 'Ms. Rao', type: 'activity' },
            { period: 8, time: '2:15 - 3:00', subject: 'Library', teacher: 'Mrs. Iyer', type: 'activity' },
        ],
        Thursday: [
            { period: 1, time: '8:00 - 8:45', subject: 'Mathematics', teacher: 'Mrs. Sharma', type: 'lecture' },
            { period: 2, time: '8:45 - 9:30', subject: 'English', teacher: 'Ms. Gupta', type: 'lecture' },
            { period: 3, time: '9:30 - 10:15', subject: 'Science Lab', teacher: 'Mr. Patel', type: 'lab' },
            { period: 0, time: '10:15 - 10:30', subject: 'RECESS', teacher: '', type: 'recess' },
            { period: 4, time: '10:30 - 11:15', subject: 'Hindi', teacher: 'Mrs. Devi', type: 'lecture' },
            { period: 5, time: '11:15 - 12:00', subject: 'Social Studies', teacher: 'Mr. Khan', type: 'lecture' },
            { period: 6, time: '12:00 - 12:45', subject: 'Physical Education', teacher: 'Coach Verma', type: 'activity' },
            { period: 0, time: '12:45 - 1:30', subject: 'LUNCH BREAK', teacher: '', type: 'recess' },
            { period: 7, time: '1:30 - 2:15', subject: 'Mathematics', teacher: 'Mrs. Sharma', type: 'lecture' },
            { period: 8, time: '2:15 - 3:00', subject: 'Science', teacher: 'Mr. Patel', type: 'lecture' },
        ],
        Friday: [
            { period: 1, time: '8:00 - 8:45', subject: 'Science', teacher: 'Mr. Patel', type: 'lecture' },
            { period: 2, time: '8:45 - 9:30', subject: 'English', teacher: 'Ms. Gupta', type: 'lecture' },
            { period: 3, time: '9:30 - 10:15', subject: 'Mathematics', teacher: 'Mrs. Sharma', type: 'lecture' },
            { period: 0, time: '10:15 - 10:30', subject: 'RECESS', teacher: '', type: 'recess' },
            { period: 4, time: '10:30 - 11:15', subject: 'Computer Science', teacher: 'Mr. Reddy', type: 'lab' },
            { period: 5, time: '11:15 - 12:00', subject: 'Hindi', teacher: 'Mrs. Devi', type: 'lecture' },
            { period: 6, time: '12:00 - 12:45', subject: 'Social Studies', teacher: 'Mr. Khan', type: 'lecture' },
            { period: 0, time: '12:45 - 1:30', subject: 'LUNCH BREAK', teacher: '', type: 'recess' },
            { period: 7, time: '1:30 - 2:15', subject: 'Music', teacher: 'Mrs. Nair', type: 'activity' },
            { period: 8, time: '2:15 - 3:00', subject: 'Physical Education', teacher: 'Coach Verma', type: 'activity' },
        ],
        Saturday: [
            { period: 1, time: '8:00 - 8:45', subject: 'Mathematics', teacher: 'Mrs. Sharma', type: 'lecture' },
            { period: 2, time: '8:45 - 9:30', subject: 'Science', teacher: 'Mr. Patel', type: 'lecture' },
            { period: 3, time: '9:30 - 10:15', subject: 'English', teacher: 'Ms. Gupta', type: 'lecture' },
            { period: 0, time: '10:15 - 10:30', subject: 'RECESS', teacher: '', type: 'recess' },
            { period: 4, time: '10:30 - 11:15', subject: 'Extra Curricular', teacher: 'Various', type: 'activity' },
        ],
    };

    const isCurrentPeriod = (timeStr) => {
        if (selectedDay !== todayIndex) return false;
        const [start, end] = timeStr.split(' - ');
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        const now = currentTime.getHours() * 60 + currentTime.getMinutes();
        return now >= sh * 60 + sm && now < eh * 60 + em;
    };

    const typeColors = {
        lecture: '#FFC229',
        lab: '#a78bfa',
        activity: '#4ade80',
        recess: '#555',
    };

    const subjectColors = {
        'Mathematics': '#3b82f6',
        'Physics': '#8b5cf6',
        'Chemistry': '#ec4899',
        'Biology': '#10b981',
        'Social Study': '#f97316',
        'Hindi': '#f59e0b',
        'Kannada': '#06b6d4',
        'English': '#f43f5e',
        'Extra Curricular': '#84cc16',
    };

    return (
        <div className="feature-container">
            {/* View Toggle */}
            <div className="tt-controls">
                <div className="tt-view-toggle">
                    <button className={`tt-toggle-btn ${view === 'daily' ? 'active' : ''}`} onClick={() => setView('daily')}>Daily</button>
                    <button className={`tt-toggle-btn ${view === 'weekly' ? 'active' : ''}`} onClick={() => setView('weekly')}>Weekly</button>
                </div>
                {view === 'daily' && (
                    <div className="tt-date-picker">
                        <label>Enter Date</label>
                        <input type="date" className="tt-date-input" onChange={handleDateChange} />
                    </div>
                )}
            </div>

            {view === 'daily' ? (
                <div className="tt-daily-layout">
                    <div className="tt-vertical-tabs">
                        {days.map((day, idx) => (
                            <button
                                key={day}
                                className={`tt-vert-tab ${selectedDay === idx ? 'active' : ''}`}
                                onClick={() => setSelectedDay(idx)}
                            >
                                <div className={`tt-vert-indicator ${selectedDay === idx ? 'active' : ''}`} />
                                {day}
                            </button>
                        ))}
                    </div>
                    <div className="tt-daily-grid">
                        {schedule[days[selectedDay]]?.map((slot, i) => (
                        <div
                            key={i}
                            className={`card tt-slot ${slot.type} ${isCurrentPeriod(slot.time) ? 'active-now' : ''}`}
                        >
                            <div className="tt-slot-left">
                                <div className="tt-period-badge" style={{ background: typeColors[slot.type] }}>
                                    {slot.period > 0 ? `P${slot.period}` : '—'}
                                </div>
                                <span className="tt-time">{slot.time}</span>
                            </div>
                            <div className="tt-slot-center">
                                <span className="tt-subject">{slot.subject}</span>
                                {slot.teacher && <span className="tt-teacher">{slot.teacher}</span>}
                                {slot.assignment && (
                                    <span className="tt-assignment">
                                        <FileText size={10} color="#FFC229" /> Due: {slot.assignment}
                                    </span>
                                )}
                            </div>
                            <div className="tt-slot-right">
                                {isCurrentPeriod(slot.time) && (
                                    <span className="tt-active-badge">
                                        <span className="tt-pulse" /> ACTIVE NOW
                                    </span>
                                )}
                                <span className="tt-type-tag" style={{ borderColor: typeColors[slot.type], color: typeColors[slot.type] }}>
                                    {slot.type.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            ) : (
                <div className="tt-weekly-wrapper">
                    <div className="tt-weekly-grid">
                        <div className="tt-corner" />
                        {days.map(d => (
                            <div key={d} className="tt-week-day-header">{d.slice(0, 3).toUpperCase()}</div>
                        ))}
                        {Array.from({ length: 10 }, (_, rowIdx) => (
                            <React.Fragment key={rowIdx}>
                                <div className="tt-time-label">
                                    {schedule.Monday[rowIdx]?.time?.split(' - ')[0] || ''}
                                </div>
                                {days.map(day => {
                                    const slot = schedule[day]?.[rowIdx];
                                    if (!slot) return <div key={day} className="tt-week-cell empty" />;
                                    return (
                                        <div
                                            key={day}
                                            className={`tt-week-cell ${slot.type}`}
                                            style={{ 
                                                borderLeft: `3px solid ${subjectColors[slot.subject] || typeColors[slot.type]}`,
                                                backgroundColor: slot.type !== 'recess' ? `${subjectColors[slot.subject] || typeColors[slot.type]}20` : undefined,
                                                borderColor: slot.type !== 'recess' ? `${subjectColors[slot.subject] || typeColors[slot.type]}40` : undefined
                                            }}
                                        >
                                            <span className="tt-w-subject">{slot.subject}</span>
                                            {slot.teacher && <span className="tt-w-teacher">{slot.teacher}</span>}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>

                </div>
            )}

            {/* Legend */}
            <div className="tt-legend">
                <span><div className="tt-legend-dot" style={{ background: '#FFC229' }} /> Lecture</span>
                <span><div className="tt-legend-dot" style={{ background: '#a78bfa' }} /> Lab</span>
                <span><div className="tt-legend-dot" style={{ background: '#4ade80' }} /> Activity</span>
                <span><div className="tt-legend-dot" style={{ background: '#555' }} /> Break</span>
            </div>
        </div>
    );
};

export default Timetable;

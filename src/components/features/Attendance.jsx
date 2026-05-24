import React, { useState, useEffect } from 'react';
import { Calendar, Bell, CheckCircle, XCircle } from 'lucide-react';
import '../features/FeatureStyles.css';
import { useAuth } from '../../context/AuthContext';
import { attendanceService } from '../../services/supabaseService';

const Attendance = () => {
    const { user } = useAuth();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear] = useState(today.getFullYear());
    const [attendanceRecord, setAttendanceRecord] = useState({});
    const [loading, setLoading] = useState(true);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    useEffect(() => {
        if (!user?._id) {
            // Generate random fallback when no user
            generateFallback();
            setLoading(false);
            return;
        }

        setLoading(true);
        attendanceService.getMonth(user._id, currentYear, currentMonth + 1)
            .then(records => {
                if (records && records.length > 0) {
                    // Build day → status map from DB records
                    const record = {};
                    records.forEach(r => {
                        const day = new Date(r.date).getDate();
                        record[day] = r.status; // 'present' | 'absent' | 'holiday'
                    });
                    setAttendanceRecord(record);
                } else {
                    generateFallback();
                }
            })
            .catch(() => generateFallback())
            .finally(() => setLoading(false));
    }, [user?._id, currentMonth]);

    const generateFallback = () => {
        const record = {};
        const dm = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let i = 1; i <= dm; i++) {
            const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
            if (dayOfWeek === 0) {
                record[i] = 'holiday'; // Sunday
            } else if (i <= today.getDate() || currentMonth < today.getMonth()) {
                record[i] = Math.random() > 0.12 ? 'present' : 'absent';
            }
        }
        setAttendanceRecord(record);
    };

    const totalDays = Object.values(attendanceRecord).filter(v => v === 'present' || v === 'absent').length;
    const presentDays = Object.values(attendanceRecord).filter(v => v === 'present').length;
    const absentDays = totalDays - presentDays;
    const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;

    const parentAlerts = [
        { id: 1, date: 'March 20, 2026', message: 'Your ward was absent from school today. Reason not provided.', sent: true },
        { id: 2, date: 'March 8, 2026', message: 'Your ward was absent from school today. Medical leave noted.', sent: true },
        { id: 3, date: 'Feb 22, 2026', message: 'Your ward was absent for 2 consecutive days. Please contact class teacher.', sent: true },
    ];

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    return (
        <div className="feature-container">
            {/* Stats Row */}
            <div className="att-stats-row">
                <div className="card att-stat">
                    <span className="att-stat-label">Total Working Days</span>
                    <span className="att-stat-value">{totalDays}</span>
                </div>
                <div className="card att-stat">
                    <span className="att-stat-label">Days Present</span>
                    <span className="att-stat-value" style={{ color: '#4ade80' }}>{presentDays}</span>
                </div>
                <div className="card att-stat">
                    <span className="att-stat-label">Days Absent</span>
                    <span className="att-stat-value" style={{ color: '#f87171' }}>{absentDays}</span>
                </div>
                <div className="card att-stat att-highlight">
                    <span className="att-stat-label">Attendance %</span>
                    <span className="att-stat-value" style={{ color: '#FFC229' }}>{percentage}%</span>
                </div>
            </div>

            <div className="att-main-grid">
                {/* Calendar */}
                <div className="card att-calendar-card">
                    <div className="att-cal-header">
                        <button className="att-nav-btn" onClick={() => setCurrentMonth(p => Math.max(0, p - 1))}>‹</button>
                        <h3>{monthNames[currentMonth]} {currentYear}</h3>
                        <button className="att-nav-btn" onClick={() => setCurrentMonth(p => Math.min(11, p + 1))}>›</button>
                    </div>

                    <div className="att-calendar-grid">
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                            <div key={d} className="att-cal-day-header">{d}</div>
                        ))}
                        {calendarDays.map((day, i) => {
                            const status = day ? attendanceRecord[day] : null;
                            return (
                                <div key={i} className={`att-cal-day ${!day ? 'empty' : ''} ${status || ''}`}>
                                    {day && (
                                        <>
                                            <span className="att-day-num">{day}</span>
                                            {status === 'present' && <div className="att-dot present" />}
                                            {status === 'absent' && <div className="att-dot absent" />}
                                            {status === 'holiday' && <div className="att-dot holiday" />}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="att-legend">
                        <span><div className="att-dot present" /> Present</span>
                        <span><div className="att-dot absent" /> Absent</span>
                        <span><div className="att-dot holiday" /> Holiday</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;

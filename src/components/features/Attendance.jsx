<<<<<<< HEAD
import React from 'react';
import { mockBackend } from '../../services/mockBackend';
import './Attendance.css';
=======
import React, { useState, useRef } from 'react';
import { Calendar, Bell, CheckCircle, XCircle, FileText, Upload } from 'lucide-react';
import '../features/FeatureStyles.css';
>>>>>>> 41146800e0a9b29044de3f30e724c130dae74304

const Attendance = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear] = useState(today.getFullYear());
    const [selectedAbsentDay, setSelectedAbsentDay] = useState(null);
    const [selectedHolidayDay, setSelectedHolidayDay] = useState(null);
    const [uploadedDocuments, setUploadedDocuments] = useState({});
    const absentFileInputRef = useRef(null);

<<<<<<< HEAD
    return (
        <div className="attendance-container">
            {/* Filters */}
            <div className="filters-section">
                <div className="filter-group">
                    <label>Curriculum *</label>
                    <select className="filter-select">
                        <option>Select Curriculum</option>
                        {attendance.curriculums?.map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Term *</label>
                    <select className="filter-select">
                        <option>Select Term</option>
                        {attendance.terms?.map(t => <option key={t}>{t}</option>)}
                    </select>
                </div>
                <div className="filter-group">
                    <label>From Month *</label>
                    <input type="month" className="filter-input" />
                </div>
                <div className="filter-group">
                    <label>To Month *</label>
                    <input type="month" className="filter-input" />
                </div>
            </div>

            {/* Daily Attendance List */}
            <div className="summary-section animate-enter">
                <div className="table-controls">
                    <div className="entries-select">
                        Show <select style={{ background: '#000', color: '#fff', border: '1px solid #fff' }}><option>10</option></select> entries
                    </div>
                    <div className="section-title" style={{ border: 'none', background: 'transparent' }}>Daily Attendance list</div>
                    <div className="search-box">
                        Search: <input type="text" />
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Overall Percentage(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.daily?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{item.day}</td>
                                <td>
                                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                                        <div style={{
                                            width: '100px',
                                            height: '6px',
                                            background: '#333',
                                            borderRadius: '3px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${item.overallPercentage}%`,
                                                height: '100%',
                                                background: item.overallPercentage > 75 ? '#4ade80' : '#f87171',
                                            }} />
                                        </div>
                                        <span style={{ fontWeight: 700, minWidth: '45px' }}>{item.overallPercentage}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="table-footer" style={{ padding: '1rem', color: '#666', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Showing 1 to {attendance.daily?.length} entries</span>
                    <div className="pagination">
                        <button style={{ background: '#000', color: '#fff', border: '1px solid #333', padding: '4px 8px', marginRight: '4px' }}>Previous</button>
                        <button style={{ background: '#000', color: '#fff', border: '1px solid #333', padding: '4px 8px' }}>Next</button>
                    </div>
=======
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    // Mock attendance data (day: 'present' | 'absent' | null)
    const attendanceRecord = {};
    const isPastOrCurrentMonth = (currentYear < today.getFullYear()) || 
                                 (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

    for (let i = 1; i <= daysInMonth; i++) {
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        const isSpecificHoliday = currentMonth === 4 && [1, 10, 25].includes(i); // May specific holidays

        if (dayOfWeek === 0 || isSpecificHoliday) {
            attendanceRecord[i] = 'holiday'; 
        } else if (isPastOrCurrentMonth) {
            const isPastDay = (currentYear < today.getFullYear()) || 
                              (currentYear === today.getFullYear() && currentMonth < today.getMonth()) ||
                              (currentYear === today.getFullYear() && currentMonth === today.getMonth() && i <= today.getDate());
            
            if (isPastDay) {
                attendanceRecord[i] = Math.random() > 0.12 ? 'present' : 'absent';
            }
        }
    }

    const getHolidayReason = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.getDay();
        
        // Mock specific holiday reasons
        if (currentMonth === 4) { // May
            if (day === 1) return "May Day / International Labour Day - Dedicated to celebrating the social and economic achievements of workers worldwide.";
            if (day === 10) return "Buddha Purnima - Celebrating the birth, enlightenment, and death of Gautama Buddha.";
            if (day === 25) return "Spring Semester Break - Official school holidays for term transition and curriculum alignment.";
        }

        if (dayOfWeek === 0) {
            return "Weekly Sunday Holiday - Time to relax, recharge, spend time with loved ones, and prepare for the academic week ahead!";
        }
        return "Official School Holiday.";
    };

    const handleAbsentFileChange = (e) => {
        const file = e.target.files[0];
        if (file && selectedAbsentDay) {
            setUploadedDocuments(prev => ({
                ...prev,
                [selectedAbsentDay]: file.name
            }));
            alert(`🎉 Leave certificate "${file.name}" uploaded successfully for ${monthNames[currentMonth]} ${selectedAbsentDay}!`);
            setSelectedAbsentDay(null);
        }
    };

    const triggerAbsentFileInput = () => {
        absentFileInputRef.current.click();
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
                            const isVerified = status === 'absent' && uploadedDocuments[day];
                            return (
                                <div 
                                    key={i} 
                                    className={`att-cal-day ${!day ? 'empty' : ''} ${status || ''} ${isVerified ? 'verified' : ''}`}
                                onClick={() => {
                                    if (status === 'absent') setSelectedAbsentDay(day);
                                    if (status === 'holiday') setSelectedHolidayDay(day);
                                }}
                            >
                                {day && (
                                    <>
                                        <span className="att-day-num">{day}</span>
                                        {status === 'present' && <div className="att-dot present" />}
                                        {status === 'absent' && (
                                            isVerified ? (
                                                <span style={{ fontSize: '0.62rem', color: '#4ade80', fontWeight: '800', marginTop: '2px' }}>Verified</span>
                                            ) : (
                                                <div className="att-dot absent" />
                                            )
                                        )}
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
>>>>>>> 41146800e0a9b29044de3f30e724c130dae74304
                </div>
            </div>
        </div>

        {/* Modal Popup for absent day leave upload */}
        {selectedAbsentDay !== null && (
            <div className="att-modal-overlay" onClick={() => setSelectedAbsentDay(null)}>
                <div className="att-modal" onClick={e => e.stopPropagation()}>
                    <h3>Submit Absence Verification</h3>
                    <p>Upload a supporting document (medical certificate or parent note) for the absence on <strong>{monthNames[currentMonth]} {selectedAbsentDay}, {currentYear}</strong>.</p>
                    
                    <div className="att-modal-actions">
                        <button className="att-modal-btn" onClick={triggerAbsentFileInput}>
                            <Upload size={18} /> Upload Document
                        </button>
                        <button className="att-modal-close" onClick={() => setSelectedAbsentDay(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Modal Popup for Holiday Reason */}
        {selectedHolidayDay !== null && (
            <div className="att-modal-overlay" onClick={() => setSelectedHolidayDay(null)}>
                <div className="att-modal att-modal-holiday" onClick={e => e.stopPropagation()}>
                    <h3>School Holiday Information</h3>
                    <div style={{ margin: '15px 0', fontSize: '2.5rem' }}>🎉</div>
                    <p style={{ fontSize: '1rem', color: '#3b82f6', fontWeight: '850', margin: '5px 0' }}>
                        {monthNames[currentMonth]} {selectedHolidayDay}, {currentYear}
                    </p>
                    <p style={{ margin: '1.25rem 0 2rem', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                        {getHolidayReason(selectedHolidayDay)}
                    </p>
                    <div className="att-modal-actions">
                        <button className="att-modal-btn att-modal-btn-holiday" onClick={() => setSelectedHolidayDay(null)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Hidden native document/file input */}
        <input 
            type="file" 
            ref={absentFileInputRef} 
            onChange={handleAbsentFileChange} 
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        />
    </div>
);
};

export default Attendance;

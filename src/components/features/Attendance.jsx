import React from 'react';
import { mockBackend } from '../../services/mockBackend';
import './Attendance.css';

const Attendance = () => {
    const { attendance } = mockBackend;

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
                </div>
            </div>
        </div>
    );
};

export default Attendance;

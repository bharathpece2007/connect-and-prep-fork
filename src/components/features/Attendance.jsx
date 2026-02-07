import React from 'react';
import { mockBackend } from '../../services/mockBackend';
import { CheckCircle, XCircle } from 'lucide-react';
import './Attendance.css';

const Attendance = () => {
    const { attendance } = mockBackend;

    return (
        <div className="attendance-container">
            <div className="feature-header">
                <h1>Attendance List</h1>
            </div>

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

            {/* Course Summary */}
            <div className="summary-section">
                <div className="section-title">Course summary list</div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '50%' }}>Course</th>
                            <th>Present / Total class</th>
                            <th>Total percentage(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.courseSummary?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.course}</td>
                                <td>{item.present} / {item.total}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            flex: 1,
                                            height: '6px',
                                            background: '#333',
                                            borderRadius: '3px',
                                            maxWidth: '100px'
                                        }}>
                                            <div style={{
                                                width: `${item.percentage}%`,
                                                height: '100%',
                                                background: item.percentage > 75 ? '#4ade80' : '#f87171',
                                                borderRadius: '3px'
                                            }} />
                                        </div>
                                        {item.percentage}%
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Daywise List */}
            <div className="daywise-section">
                <div className="table-controls">
                    <div className="entries-select">
                        Show <select style={{ background: '#000', color: '#fff', border: '1px solid #fff' }}><option>10</option></select> entries
                    </div>
                    <div className="section-title" style={{ border: 'none', background: 'transparent' }}>Daywise course list</div>
                    <div className="search-box">
                        Search: <input type="text" />
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Course</th>
                            <th>Class Date</th>
                            <th>Attendance</th>
                            <th>Document status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.daywise?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.course}</td>
                                <td>{item.date}</td>
                                <td>
                                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="doc-status">{item.docStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="table-footer" style={{ padding: '1rem', color: '#666', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Showing 1 to {attendance.daywise?.length} entries</span>
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

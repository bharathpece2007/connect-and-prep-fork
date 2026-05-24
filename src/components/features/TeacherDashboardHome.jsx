import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { noticeService, doubtService } from '../../services/supabaseService';
import {
    Users, BookOpen, MessageSquare, ClipboardCheck,
    Megaphone, TrendingUp, Award, Bell
} from 'lucide-react';
import '../features/FeatureStyles.css';
import '../layout/TeacherDashboardHome.css';

const TeacherDashboardHome = () => {
    const { user } = useAuth();
    const [pendingDoubts, setPendingDoubts] = useState(0);

    useEffect(() => {
        // Count unresolved doubts across all subjects
        doubtService.getAll(null)
            .then(data => {
                const unresolved = data.filter(d => !d.resolved).length;
                setPendingDoubts(unresolved);
            })
            .catch(() => {});
    }, []);

    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    // Static class data (will come from DB once admin seeds class tables)
    const classes = [
        { name: '10A', subject: 'Mathematics', students: 34, time: '08:00 AM', room: 'R-201', status: 'upcoming' },
        { name: '9B', subject: 'Mathematics', students: 32, time: '10:30 AM', room: 'R-104', status: 'upcoming' },
        { name: '8C', subject: 'Mathematics', students: 35, time: '01:30 PM', room: 'R-305', status: 'upcoming' },
    ];

    const recentActivity = [
        { icon: '📝', text: 'You posted a notice: Annual Day Celebration', time: '2 hrs ago', color: '#FFC229' },
        { icon: '✅', text: 'Marked attendance for Class 10A', time: '3 hrs ago', color: '#4ade80' },
        { icon: '💬', text: '3 new doubts from students', time: '5 hrs ago', color: '#a78bfa' },
        { icon: '📋', text: 'Uploaded Chapter 7 study materials', time: '1 day ago', color: '#60a5fa' },
    ];

    const quickStats = [
        { label: 'MY CLASSES', value: '3', sub: 'Today', icon: <BookOpen size={22} />, color: '#FFC229' },
        { label: 'TOTAL STUDENTS', value: '101', sub: 'Across all classes', icon: <Users size={22} />, color: '#a78bfa' },
        { label: 'PENDING DOUBTS', value: pendingDoubts, sub: 'Need answers', icon: <MessageSquare size={22} />, color: '#f87171' },
        { label: 'AVG ATTENDANCE', value: '87%', sub: 'This month', icon: <ClipboardCheck size={22} />, color: '#4ade80' },
    ];

    return (
        <div className="feature-container">
            {/* Greeting Banner */}
            <div className="td-greeting-banner card">
                <div className="td-greeting-left">
                    <p className="td-date">{dateString}</p>
                    <h2 className="td-greeting-text">
                        Good {today.getHours() < 12 ? 'Morning' : today.getHours() < 17 ? 'Afternoon' : 'Evening'},{' '}
                        <span className="td-name-highlight">{user?.name?.split(' ')[0] || 'Teacher'}</span> 👋
                    </h2>
                    <p className="td-greeting-sub">You have {classes.length} classes scheduled today</p>
                </div>
                <div className="td-greeting-badge">
                    <Award size={36} color="#FFC229" />
                    <span>TEACHER</span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="td-stats-grid">
                {quickStats.map((stat, i) => (
                    <div key={i} className="card td-stat-card" style={{ borderTop: `3px solid ${stat.color}` }}>
                        <div className="td-stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
                        <div className="td-stat-body">
                            <span className="td-stat-label">{stat.label}</span>
                            <span className="td-stat-value" style={{ color: stat.color }}>{stat.value}</span>
                            <span className="td-stat-sub">{stat.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="td-main-grid">
                {/* Today's Classes */}
                <div className="card td-section">
                    <div className="td-section-header">
                        <h3><BookOpen size={18} /> Today's Classes</h3>
                        <span className="td-section-badge">{classes.length} scheduled</span>
                    </div>
                    <div className="td-class-list">
                        {classes.map((cls, i) => (
                            <div key={i} className="td-class-row">
                                <div className="td-class-left">
                                    <div className="td-class-badge">{cls.name}</div>
                                    <div className="td-class-info">
                                        <span className="td-class-subject">{cls.subject}</span>
                                        <span className="td-class-meta">{cls.students} students · Room {cls.room}</span>
                                    </div>
                                </div>
                                <div className="td-class-right">
                                    <span className="td-class-time">{cls.time}</span>
                                    <button className="td-quick-btn">Take Attendance</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card td-section">
                    <div className="td-section-header">
                        <h3><TrendingUp size={18} /> Quick Actions</h3>
                    </div>
                    <div className="td-action-grid">
                        <button className="td-action-card" onClick={() => {}}>
                            <Megaphone size={24} color="#FFC229" />
                            <span>Post Notice</span>
                        </button>
                        <button className="td-action-card" onClick={() => {}}>
                            <MessageSquare size={24} color="#a78bfa" />
                            <span>Answer Doubts</span>
                            {pendingDoubts > 0 && <span className="td-action-badge">{pendingDoubts}</span>}
                        </button>
                        <button className="td-action-card" onClick={() => {}}>
                            <BookOpen size={24} color="#60a5fa" />
                            <span>Upload Materials</span>
                        </button>
                        <button className="td-action-card" onClick={() => {}}>
                            <ClipboardCheck size={24} color="#4ade80" />
                            <span>Mark Attendance</span>
                        </button>
                        <button className="td-action-card" onClick={() => {}}>
                            <Users size={24} color="#f87171" />
                            <span>View Students</span>
                        </button>
                        <button className="td-action-card" onClick={() => {}}>
                            <Bell size={24} color="#fb923c" />
                            <span>Send Alert</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card td-activity-card">
                <div className="td-section-header">
                    <h3><ClipboardCheck size={18} /> Recent Activity</h3>
                </div>
                <div className="td-activity-list">
                    {recentActivity.map((item, i) => (
                        <div key={i} className="td-activity-row">
                            <div className="td-activity-icon" style={{ color: item.color }}>{item.icon}</div>
                            <div className="td-activity-text">{item.text}</div>
                            <div className="td-activity-time">{item.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardHome;

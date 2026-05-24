import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
<<<<<<< HEAD
import { BookOpen, CheckCircle, Clock, TrendingUp, Calendar, AlertCircle, Target } from 'lucide-react';
import './DashboardHome.css'; 

const DashboardHome = () => {
    const navigate = useNavigate();
    // Mock Data - In a real app, this would come from an API
=======
import { Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, Target, ToggleLeft, ToggleRight } from 'lucide-react';
import './DashboardHome.css';

const DashboardHome = () => {
    const navigate = useNavigate();
    const [parentView, setParentView] = useState(false);

    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const pendingTasks = [
        { id: 1, title: 'Math Homework - Ch 7 Exercises', due: 'Today', priority: 'high' },
        { id: 2, title: 'Science Lab Report Submission', due: 'Tomorrow', priority: 'high' },
        { id: 3, title: 'English Essay Draft', due: 'In 3 days', priority: 'medium' },
        { id: 4, title: 'History Assignment - French Rev', due: 'In 5 days', priority: 'low' },
    ];

>>>>>>> 41146800e0a9b29044de3f30e724c130dae74304
    const attendanceData = [
        { name: 'Present', value: 92, color: '#4ade80' },
        { name: 'Absent', value: 8, color: '#f87171' }
    ];

    const weeklyStudy = [
        { day: 'Mon', hours: 4 },
        { day: 'Tue', hours: 3 },
        { day: 'Wed', hours: 5 },
        { day: 'Thu', hours: 2 },
        { day: 'Fri', hours: 6 },
        { day: 'Sat', hours: 4 },
        { day: 'Sun', hours: 1 },
    ];

    // Parent view data
    const childOverview = {
        name: 'Ravi Kumar',
        grade: '8th Grade - Section B',
        attendance: '92%',
        homework: '85% completed',
        behavior: 'Excellent',
        lastRemark: 'Active participation in Science class. Great improvement in Mathematics.',
        upcomingFees: '₹15,000 due by June 10',
    };

    return (
        <div className="dashboard-home-container">
            {/* Welcome Section - no card box, just text */}
            <div className="dh-welcome">
                <div>
                    <h2 className="dh-greeting">
                        {parentView ? `${childOverview.name}'s Overview` : 'Welcome back, Student!'}
                    </h2>
                    <p className="dh-subtitle">
                        {parentView ? childOverview.grade : 'Your centralized hub for academic excellence.'}
                    </p>
                </div>
<<<<<<< HEAD
                <div className="date-badge">
                    <Calendar size={16} />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="stats-grid">
                <div className="stat-card streak-card">
                    <div className="stat-icon-wrapper">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>Study Streak</h3>
                        <div className="stat-value">12 Days <span className="fire-emoji">🔥</span></div>
                        <p className="stat-subtitle">Keep it up!</p>
                    </div>
                </div>

                <div className="stat-card pending-card" 
                    onClick={() => navigate('/dashboard/homework', { state: { filter: 'Pending' } })}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="stat-icon-wrapper">
                        <AlertCircle size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>Tasks Pending</h3>
                        <div className="stat-value">5</div>
                        <p className="stat-subtitle">High Priority</p>
                    </div>
                </div>

                <div className="stat-card event-card">
                    <div className="stat-icon-wrapper">
                        <Clock size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>Next Event</h3>
                        <div className="stat-value event-name">Math Marathon</div>
                        <p className="stat-subtitle">Today, 2:00 PM</p>
                    </div>
                </div>

                <div className="stat-card xp-card" 
                    onClick={() => navigate('/dashboard/leaderboard')}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="stat-icon-wrapper">
                        <TrendingUp size={24} color="var(--accent-action)" />
                    </div>
                    <div className="stat-content">
                        <h3>Current XP</h3>
                        <div className="stat-value">4,500 <span className="rank-badge">#2</span></div>
                        <p className="stat-subtitle">Scholar Rank</p>
=======
                <div className="dh-welcome-right">
                    <div className="dh-date-badge">
                        <Calendar size={14} />
                        <span>{dateString}</span>
>>>>>>> 41146800e0a9b29044de3f30e724c130dae74304
                    </div>
                </div>
            </div>

            {/* Thin Divider */}
            <div className="dh-divider" />

            {!parentView ? (
                <>
                    {/* 4 Stat Cards Row */}
                    <div className="dh-stats-row">
                        <div className="dh-stat-card">
                            <div className="dh-stat-icon" style={{ background: 'rgba(251,146,60,0.15)' }}>
                                <TrendingUp size={22} color="#fb923c" />
                            </div>
                            <div className="dh-stat-body">
                                <span className="dh-stat-label">STUDY STREAK</span>
                                <span className="dh-stat-value">12 Days <span className="fire-emoji">🔥</span></span>
                                <span className="dh-stat-sub">Keep it up!</span>
                            </div>
                        </div>

                        <div className="dh-stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard/homework')}>
                            <div className="dh-stat-icon" style={{ background: 'rgba(96,165,250,0.15)' }}>
                                <AlertCircle size={22} color="#60a5fa" />
                            </div>
                            <div className="dh-stat-body">
                                <span className="dh-stat-label">TASKS PENDING</span>
                                <span className="dh-stat-value">7</span>
                                <span className="dh-stat-sub">Assignments</span>
                            </div>
                        </div>

                        <div className="dh-stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard/notices')}>
                            <div className="dh-stat-icon" style={{ background: 'rgba(74,222,128,0.15)' }}>
                                <Clock size={22} color="#4ade80" />
                            </div>
                            <div className="dh-stat-body">
                                <span className="dh-stat-label">NEXT EVENT</span>
                                <span className="dh-stat-value dh-event-name">Annual Day</span>
                                <span className="dh-stat-sub">May 15, 2026</span>
                            </div>
                        </div>

                    </div>

                    {/* AI Study Goal Banner */}
                    <div className="dh-roadmap-banner" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard/prep-box')}>
                        <div className="dh-roadmap-left">
                            <div className="dh-roadmap-icon">
                                <Target size={28} color="#a78bfa" />
                            </div>
                            <div>
                                <h3>AI Study Goal: Mastering Calculus</h3>
                                <p>You have 2 topics left to revise for your upcoming 2024 Exam.</p>
                            </div>
                        </div>
                        <button className="dh-roadmap-btn" onClick={(e) => { e.stopPropagation(); navigate('/dashboard/prep-box'); }}>RESUME ROADMAP</button>
                    </div>

                    {/* Pending Tasks */}
                    <div className="dh-section-title">Pending Tasks</div>
                    <div className="dh-tasks-card">
                        {pendingTasks.map(task => (
                            <div key={task.id} className="dh-task-item">
                                <div className={`task-priority-dot ${task.priority}`} />
                                <div className="task-info">
                                    <span className="task-title">{task.title}</span>
                                    <span className="task-due">
                                        <Clock size={12} /> {task.due}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="dh-charts-row">
                        <div className="dh-chart-card">
                            <h3>Overall Attendance</h3>
                            <div className="chart-wrapper">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value">
                                            {attendanceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="chart-center-text">
                                    <span className="percentage">92%</span>
                                    <span className="label">Present</span>
                                </div>
                            </div>
                        </div>

                        <div className="dh-chart-card dh-wide-chart">
                            <h3>Study Hours This Week</h3>
                            <div className="chart-wrapper bar-chart-wrapper">
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={weeklyStudy} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                                        <XAxis dataKey="day" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                                        <Bar dataKey="hours" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={32} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                /* Parent Overview */
                <>
                    <div className="parent-overview-grid">
                        <div className="dh-parent-card">
                            <h3>📊 Academic Summary</h3>
                            <div className="parent-stat-row">
                                <span className="parent-label">Attendance</span>
                                <span className="parent-val accent">{childOverview.attendance}</span>
                            </div>
                            <div className="parent-stat-row">
                                <span className="parent-label">Homework</span>
                                <span className="parent-val">{childOverview.homework}</span>
                            </div>
                            <div className="parent-stat-row">
                                <span className="parent-label">Behavior</span>
                                <span className="parent-val success">{childOverview.behavior}</span>
                            </div>
                        </div>
                        <div className="dh-parent-card">
                            <h3>📝 Teacher Remarks</h3>
                            <p className="remark-text">{childOverview.lastRemark}</p>
                        </div>
                        <div className="dh-parent-card">
                            <h3>💰 Fee Status</h3>
                            <p className="fee-text">{childOverview.upcomingFees}</p>
                            <button className="dh-roadmap-btn" style={{ marginTop: '1rem' }}>Pay Now</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardHome;

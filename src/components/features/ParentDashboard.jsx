import React from 'react';
import { mockBackend } from '../../services/mockBackend';
import { 
    Users, Activity, Wallet, Bell, 
    TrendingUp, User, Home, BookOpen, 
    Calendar, CheckCircle2, AlertTriangle, 
    ShieldAlert, LineChart as ChartIcon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './FeatureStyles.css';

const ParentDashboard = () => {
    const parent = mockBackend.parentData || {};
    const child = parent.childPerformance || {
        attendance: 88,
        homeworkCompletion: 92,
        behavior: 'Excellent',
        recentGrades: [
            { subject: 'Math', grade: 'A', date: 'Oct 12' },
            { subject: 'Science', grade: 'A-', date: 'Oct 10' },
            { subject: 'English', grade: 'B+', date: 'Oct 05' }
        ],
        teacherRemarks: 'Brilliant child, very active in class and sports.',
        cgpaTrends: [
            { sem: 'Sem 1', gpa: 8.2 },
            { sem: 'Sem 2', gpa: 8.5 },
            { sem: 'Sem 3', gpa: 8.4 },
            { sem: 'Sem 4', gpa: 8.9 },
            { sem: 'Sem 5', gpa: 9.1 },
        ],
        upcomingExams: [
            { subject: 'Advanced Mathematics', date: 'Oct 25, 2026', time: '10:00 AM' },
            { subject: 'Physics Lab', date: 'Oct 28, 2026', time: '02:00 PM' },
            { subject: 'Operating Systems', date: 'Nov 02, 2026', time: '10:00 AM' }
        ]
    };
    const notices = parent.notices || [
        { id: 1, title: 'Annual Day Meet', date: 'Oct 20', message: 'Parents are invited for the annual day functions.' }
    ];
    const fees = parent.fees || [
        { id: 1, title: 'Semester 6 Tuition', amount: '₹45,000', status: 'Pending' }
    ];

    return (
        <div className="parent-dashboard-container">
            <header className="parent-welcome">
                <h1>Welcome Back, Parent! 👋</h1>
                <p>Track your child's progress and stay updated with school notices.</p>
            </header>

            <div className="summary-cards">
                <div className="summary-card attendance">
                    <div className="card-icon"><Activity size={24} color="#00ffcc" /></div>
                    <div className="card-info">
                        <h3>{child.attendance}%</h3>
                        <p>Total Attendance</p>
                    </div>
                </div>
                <div className="summary-card homework">
                    <div className="card-icon"><CheckCircle2 size={24} color="#a78bfa" /></div>
                    <div className="card-info">
                        <h3>{child.homeworkCompletion}%</h3>
                        <p>Homework Compliance</p>
                    </div>
                </div>
                <div className="summary-card behavior">
                    <div className="card-icon"><TrendingUp size={24} color="#f472b6" /></div>
                    <div className="card-info">
                        <h3>{child.behavior}</h3>
                        <p>Weekly Behavior Status</p>
                    </div>
                </div>
                <div className="summary-card safety">
                    <div className="card-icon"><ShieldAlert size={24} color="#fbbf24" /></div>
                    <div className="card-info">
                        <h3>Safe</h3>
                        <p>Online Presence</p>
                    </div>
                </div>
            </div>

            <div className="parent-layout-grid">
                {/* CGPA Trend Section */}
                <div className="parent-section cgpa-trend full-width">
                    <div className="section-header">
                        <h3>CGPA Growth Trend</h3>
                        <ChartIcon size={20} />
                    </div>
                    <div className="chart-container" style={{ height: '250px', width: '100%', marginTop: '1rem' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={child.cgpaTrends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="sem" stroke="#94a3b8" />
                                <YAxis domain={[0, 10]} stroke="#94a3b8" />
                                <Tooltip 
                                    contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    itemStyle={{ color: '#00ffcc' }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="gpa" 
                                    stroke="#00ffcc" 
                                    strokeWidth={3} 
                                    dot={{ fill: '#00ffcc', r: 6 }} 
                                    activeDot={{ r: 8, stroke: '#fff' }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Upcoming Exams Section */}
                <div className="parent-section exams">
                    <div className="section-header">
                        <h3>Upcoming Exams</h3>
                        <Calendar size={20} />
                    </div>
                    <div className="exam-list">
                        {(child.upcomingExams || []).map((exam, idx) => (
                            <div key={idx} className="exam-card">
                                <div className="exam-subject">{exam.subject}</div>
                                <div className="exam-details">
                                    <span><Calendar size={14} /> {exam.date}</span>
                                    <span><Activity size={14} /> {exam.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Grades Section */}
                <div className="parent-section grades">
                    <div className="section-header">
                        <h3>Recent Grades</h3>
                        <TrendingUp size={20} />
                    </div>
                    <div className="grade-list">
                        {(child.recentGrades || []).map((g, idx) => (
                            <div key={idx} className="grade-row">
                                <div className="subject-icon"><BookOpen size={16} /></div>
                                <div className="subject-name">{g.subject}</div>
                                <div className="grade-value">{g.grade}</div>
                                <div className="grade-date">{g.date}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fees and Dues Section */}
                <div className="parent-section fees">
                    <div className="section-header">
                        <h3>Fees & Dues</h3>
                        <Wallet size={20} />
                    </div>
                    <div className="fee-list">
                        {(fees || []).map(fee => (
                            <div key={fee.id} className={`fee-row ${fee.status.toLowerCase()}`}>
                                <div className="fee-info">
                                    <span className="fee-title">{fee.title}</span>
                                    <span className="fee-amount">{fee.amount}</span>
                                </div>
                                <button className={`pay-btn ${fee.status.toLowerCase()}`}>
                                    {fee.status === 'Paid' ? 'Paid' : 'Pay Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Teacher Remarks */}
                <div className="parent-section remarks">
                    <div className="section-header">
                        <h3>Teacher Remarks</h3>
                        <Bell size={20} />
                    </div>
                    <div className="remark-box">
                        <User size={20} className="teacher-avatar" />
                        <p>"{child.teacherRemarks}"</p>
                        <span className="teacher-name">- Class Teacher</span>
                    </div>
                </div>

                {/* School Notices */}
                <div className="parent-section notices">
                    <div className="section-header">
                        <h3>School Notices</h3>
                        <Calendar size={20} />
                    </div>
                    <div className="notice-list">
                        {(notices || []).map(notice => (
                            <div key={notice.id} className="notice-item">
                                <div className="notice-top">
                                    <span className="notice-title">{notice.title}</span>
                                    <span className="notice-date">{notice.date}</span>
                                </div>
                                <p className="notice-msg">{notice.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;

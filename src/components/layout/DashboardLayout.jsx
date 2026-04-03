import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { mockBackend } from '../../services/mockBackend';
import {
    BookOpen, BarChart2, FileText, Users, MessageSquare, Award,
    LogOut, Menu, X, Layout, Library, GraduationCap, Calendar,
    UserCheck, Timer, Bell, Sun, Moon, Target, Trophy, Briefcase,
    Pencil, Clock, Hash, BrainCircuit, Calculator, Activity,
    Flame, StickyNote, CheckCircle2, Shield, Ghost
} from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [notifOpen, setNotifOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', icon: <Layout size={20} />, path: '/dashboard' },
        { label: 'Timetable', icon: <Clock size={20} />, path: '/dashboard/timetable' },
        { label: 'Academic Hub', icon: <GraduationCap size={20} />, path: '/dashboard/academic' },
        { label: 'Attendance List', icon: <Calendar size={20} />, path: '/dashboard/attendance' },
        { label: 'Question Papers', icon: <FileText size={20} />, path: '/dashboard/papers' },
        { label: 'Notes & PYQs', icon: <BookOpen size={20} />, path: '/dashboard/notes' },
        { label: 'Discussion Forum', icon: <Hash size={20} />, path: '/dashboard/chat' },
        { label: 'Study Zone', icon: <Users size={20} />, path: '/dashboard/studyzone' },
        { label: 'Doubt Solving', icon: <MessageSquare size={20} />, path: '/dashboard/doubts' },
        { label: 'CGPA Calculator', icon: <Calculator size={20} />, path: '/dashboard/cgpa' },
        { label: 'Activity Feed', icon: <Activity size={20} />, path: '/dashboard/feed' },
        { label: 'My Notes & Tasks', icon: <StickyNote size={20} />, path: '/dashboard/my-notes' },
        { label: 'Placements & Interns', icon: <Briefcase size={20} />, path: '/dashboard/placements' },
        { label: 'Collaborative Board', icon: <Pencil size={20} />, path: '/dashboard/whiteboard' },
        { label: 'Answer Analysis', icon: <BarChart2 size={20} />, path: '/dashboard/analysis' },
        { label: 'Library', icon: <Library size={20} />, path: '/dashboard/library' },
        { label: 'Weekly Challenges', icon: <Flame size={20} />, path: '/dashboard/challenges' },
        { label: 'Leaderboard & XP', icon: <Trophy size={20} />, path: '/dashboard/leaderboard' },
        { label: 'Anonymous Chat', icon: <Ghost size={20} />, path: '/dashboard/anonymous-chat' },
        { label: 'Complaint Box', icon: <Shield size={20} />, path: '/dashboard/complaints' },
    ];

    const currentLabel = navItems.slice().sort((a, b) => b.path.length - a.path.length).find(i => location.pathname.startsWith(i.path))?.label || 'Dashboard';

    const notifications = mockBackend.notifications || [];
    const unreadCount = notifications.filter(n => !n.read).length;

    const notifIcons = {
        warning: <Bell size={16} color="var(--error)" />,
        event: <Calendar size={16} color="var(--accent-primary)" />,
        upload: <FileText size={16} color="var(--success)" />,
        placement: <Briefcase size={16} color="var(--accent-action)" />,
        social: <Users size={16} color="#f472b6" />,
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-area">
                        <GraduationCap size={32} />
                        <span className="sidebar-text">Connect & Prep</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <div
                            key={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <div className="icon-container">{item.icon}</div>
                            <span className="sidebar-text">{item.label}</span>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-bar">
                    <h2 className={currentLabel === 'PEER TO PEER TUTORING' ? 'pink-header' : ''}>
                        {currentLabel}
                    </h2>

                    <div className="header-right-section" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="notification-btn-header" onClick={toggleTheme} style={{ marginRight: '-10px' }}>
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                        </button>

                        {/* Notification Bell with Dropdown */}
                        <div className="notif-wrapper">
                            <button className="notification-btn-header" onClick={() => setNotifOpen(!notifOpen)}>
                                <Bell size={24} />
                                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
                            </button>
                            {notifOpen && (
                                <>
                                    <div className="notif-dropdown">
                                        <div className="notif-dropdown-header">
                                            <h4>Notifications</h4>
                                            <span>{unreadCount} unread</span>
                                        </div>
                                        {notifications.map(n => (
                                            <div key={n.id} className={`notif-item ${n.read ? 'read' : 'unread'}`}>
                                                <div className="notif-icon">{notifIcons[n.type] || <Bell size={16} />}</div>
                                                <div className="notif-body">
                                                    <strong>{n.title}</strong>
                                                    <p>{n.message}</p>
                                                    <span className="notif-time">{n.time}</span>
                                                </div>
                                                {!n.read && <div className="unread-dot" />}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="backdrop" onClick={() => setNotifOpen(false)} />
                                </>
                            )}
                        </div>

                        <div className="profile-dropdown-container">
                            <ProfileMenu user={user} logout={handleLogout} />
                        </div>
                    </div>
                </header>

                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

// Sub-component for Profile Menu
const ProfileMenu = ({ user, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="profile-menu-wrapper">
            <button className="profile-btn" onClick={() => setIsOpen(!isOpen)}>
                <div className="avatar-circle">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="user-text">
                    <span className="name">{user?.name || 'User'}</span>
                    <span className="role">{user?.role || 'Student'}</span>
                </div>
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-header">
                        <p className="d-name">Name: {user?.name}</p>
                        <p className="d-usn">USN: 4VV25EC032</p>
                    </div>
                    <div className="dropdown-item" onClick={() => { navigate('/dashboard/profile'); setIsOpen(false); }}>Profile</div>
                    <div className="dropdown-item">Change Password</div>
                    <div className="dropdown-item logout" onClick={logout}>
                        <LogOut size={16} /> Logout
                    </div>
                </div>
            )}
            {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}
        </div>
    );
};

export default DashboardLayout;

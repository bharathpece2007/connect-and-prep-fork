import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { mockBackend } from '../../services/mockBackend';
import {
    LogOut, Layout, GraduationCap, Calendar,
    Clock, Bell, Sun, Moon, MessageSquare, FileText,
    BookOpenCheck, BarChart2, Megaphone, Heart, User, Bot
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
        { label: 'Homework Hub', icon: <BookOpenCheck size={20} />, path: '/dashboard/homework' },
        { label: 'Attendance List', icon: <Calendar size={20} />, path: '/dashboard/attendance' },
        { label: 'Timetable', icon: <Clock size={20} />, path: '/dashboard/timetable' },

        { type: 'divider' },

        { label: 'Prep Box AI', icon: <Bot size={20} />, path: '/dashboard/prep-box' },
        { label: 'Doubt Solving', icon: <MessageSquare size={20} />, path: '/dashboard/doubts' },
        { label: 'Report Card', icon: <BarChart2 size={20} />, path: '/dashboard/report-card' },
        { label: 'Notice Board', icon: <Megaphone size={20} />, path: '/dashboard/notices' },
        { label: 'Help & Care Box', icon: <Heart size={20} />, path: '/dashboard/help-care' },
    ];

    const currentLabel = navItems
        .filter(i => i.path)
        .slice()
        .sort((a, b) => b.path.length - a.path.length)
        .find(i => location.pathname.startsWith(i.path))?.label || 'Dashboard';

    const notifications = mockBackend.notifications || [];
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-area">
                        <GraduationCap size={32} />
                        <span className="sidebar-text">Connect & Prep</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map((item, idx) => (
                        item.type === 'divider' ? (
                            <div key={`divider-${idx}`} className="nav-divider" />
                        ) : (
                            <div
                                key={item.path}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                                onClick={() => navigate(item.path)}
                            >
                                <div className="icon-container">{item.icon}</div>
                                <span className="sidebar-text">{item.label}</span>
                            </div>
                        )
                    ))}
                </nav>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <h2>{currentLabel}</h2>
                    <div className="header-right-section" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="notification-btn-header" onClick={toggleTheme} style={{ marginRight: '-10px' }}>
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
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
                                                <div className="notif-icon"><Bell size={16} /></div>
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
                        <p className="d-usn">Role: {user?.role}</p>
                    </div>
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

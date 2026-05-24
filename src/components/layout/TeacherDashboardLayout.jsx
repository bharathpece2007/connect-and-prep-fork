import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { notificationService } from '../../services/supabaseService';
import {
    LogOut, Layout, GraduationCap, Bell, Sun, Moon,
    Megaphone, BookOpen, Users, ClipboardList, MessageSquare,
    BookOpenCheck, BarChart2, FileText, UserCheck
} from 'lucide-react';
import './DashboardLayout.css'; // reuse the same CSS — same sidebar styles

const TeacherDashboardLayout = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user?._id) return;
        notificationService.getAll(user._id)
            .then(setNotifications)
            .catch(() => setNotifications([]));
    }, [user?._id]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Teacher-specific navigation items
    const navItems = [
        { label: 'Dashboard', icon: <Layout size={20} />, path: '/teacher' },
        { label: 'My Classes', icon: <Users size={20} />, path: '/teacher/classes' },
        { label: 'Attendance', icon: <UserCheck size={20} />, path: '/teacher/attendance' },
        { label: 'Timetable', icon: <ClipboardList size={20} />, path: '/teacher/timetable' },

        { type: 'divider' },

        { label: 'Notice Board', icon: <Megaphone size={20} />, path: '/teacher/notices' },
        { label: 'Doubt Solving', icon: <MessageSquare size={20} />, path: '/teacher/doubts' },
        { label: 'Study Materials', icon: <BookOpen size={20} />, path: '/teacher/materials' },
        { label: 'Question Papers', icon: <FileText size={20} />, path: '/teacher/papers' },
        { label: 'Results', icon: <BarChart2 size={20} />, path: '/teacher/results' },
        { label: "Teacher's Diary", icon: <BookOpenCheck size={20} />, path: '/teacher/diary' },
    ];

    const currentLabel = navItems
        .filter(i => i.path)
        .slice()
        .sort((a, b) => b.path.length - a.path.length)
        .find(i => location.pathname.startsWith(i.path))?.label || 'Dashboard';

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-area">
                        <GraduationCap size={32} />
                        <span className="sidebar-text">Connect &amp; Prep</span>
                    </div>
                    {/* Teacher role badge */}
                    <div className="sidebar-text" style={{
                        fontSize: '0.65rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        color: '#FFC229',
                        background: 'rgba(255,194,41,0.1)',
                        border: '1px solid rgba(255,194,41,0.3)',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        marginTop: '-4px',
                    }}>
                        TEACHER PORTAL
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
                                        {notifications.length === 0 && (
                                            <div style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center' }}>
                                                No notifications yet
                                            </div>
                                        )}
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

    return (
        <div className="profile-menu-wrapper">
            <button className="profile-btn" onClick={() => setIsOpen(!isOpen)}>
                <div className="avatar-circle" style={{ background: 'rgba(255,194,41,0.2)', color: '#FFC229', border: '2px solid #FFC229' }}>
                    {user?.name?.charAt(0) || 'T'}
                </div>
                <div className="user-text">
                    <span className="name">{user?.name || 'Teacher'}</span>
                    <span className="role" style={{ color: '#FFC229' }}>Teacher</span>
                </div>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-header">
                        <p className="d-name">Name: {user?.name}</p>
                        <p className="d-usn">Role: Teacher</p>
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

export default TeacherDashboardLayout;

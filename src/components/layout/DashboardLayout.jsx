import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    BookOpen,
    BarChart2,
    FileText,
    Users,
    MessageSquare,
    Award,
    LogOut,
    Menu,
    X,
    Layout,
    Library,
    GraduationCap,
    Calendar,
    UserCheck,
    Timer
} from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', icon: <Layout size={20} />, path: '/dashboard' },
        { label: 'Question Papers', icon: <FileText size={20} />, path: '/dashboard/papers' },
        { label: 'Answer Analysis', icon: <BarChart2 size={20} />, path: '/dashboard/analysis' },
        { label: 'Notes & PYQs', icon: <BookOpen size={20} />, path: '/dashboard/notes' },
        { label: 'Group Study', icon: <Users size={20} />, path: '/dashboard/groups' },
        { label: 'P2P Tutoring', icon: <UserCheck size={20} />, path: '/dashboard/p2p' },
        { label: 'Study Marathons', icon: <Timer size={20} />, path: '/dashboard/marathons' },
        { label: 'Doubt Solving', icon: <MessageSquare size={20} />, path: '/dashboard/doubts' },
        { label: 'Results & AI', icon: <Award size={20} />, path: '/dashboard/results' },
        { label: 'Library', icon: <Library size={20} />, path: '/dashboard/library' },
        { label: 'Attendance', icon: <Calendar size={20} />, path: '/dashboard/attendance' },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="logo-area">
                        <GraduationCap size={32} color="#646cff" />
                        {sidebarOpen && <span>Connect & Prep</span>}
                    </div>
                    <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <div
                            key={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon}
                            {sidebarOpen && <span>{item.label}</span>}
                        </div>
                    ))}
                </nav>

                <div className="user-profile">
                    <div className="user-info">
                        {sidebarOpen && (
                            <>
                                <p className="user-name">{user?.name}</p>
                                <p className="user-role">{user?.role === 'student' ? 'Student' : 'Teacher'}</p>
                            </>
                        )}
                    </div>
                    <button className="logout-btn" onClick={handleLogout} title="Logout">
                        <LogOut size={20} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-bar">
                    <h2>{navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}</h2>
                    <div className="date-display">{new Date().toDateString()}</div>
                </header>

                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;

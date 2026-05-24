import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import DashboardLayout from './components/layout/DashboardLayout'
import TeacherDashboardLayout from './components/layout/TeacherDashboardLayout'
import DashboardHome from './components/features/DashboardHome'
import HomeworkHub from './components/features/HomeworkHub'
import Attendance from './components/features/Attendance'
import Timetable from './components/features/Timetable'
import DoubtSolving from './components/features/DoubtSolving'
import ReportCard from './components/features/ReportCard'
import NoticeBoard from './components/features/NoticeBoard'
import HelpCareBox from './components/features/HelpCareBox'
import TeacherDashboardHome from './components/features/TeacherDashboardHome'

import './App.css'

// ── Protected Route: requires login ──────────────────────────
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

// ── Student-Only Route: teachers get redirected to /teacher ──
const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (user.role === 'teacher') return <Navigate to="/teacher" />;
    return children;
};

// ── Teacher-Only Route: students get redirected to /dashboard ─
const TeacherRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'teacher') return <Navigate to="/dashboard" />;
    return children;
};

// ── Smart Root Redirect: based on role ───────────────────────
const RootRedirect = () => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (user.role === 'teacher') return <Navigate to="/teacher" />;
    return <Navigate to="/dashboard" />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Smart root redirect */}
                    <Route path="/" element={<RootRedirect />} />

                    {/* ── STUDENT Dashboard ───────────────────── */}
                    <Route path="/dashboard" element={
                        <StudentRoute>
                            <DashboardLayout />
                        </StudentRoute>
                    }>
                        <Route index element={<DashboardHome />} />
                        <Route path="homework" element={<HomeworkHub />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="timetable" element={<Timetable />} />
                        <Route path="doubts" element={<DoubtSolving />} />
                        <Route path="report-card" element={<ReportCard />} />
                        <Route path="notices" element={<NoticeBoard />} />
                        <Route path="help-care" element={<HelpCareBox />} />
                    </Route>

                    {/* ── TEACHER Dashboard ───────────────────── */}
                    <Route path="/teacher" element={
                        <TeacherRoute>
                            <TeacherDashboardLayout />
                        </TeacherRoute>
                    }>
                        <Route index element={<TeacherDashboardHome />} />
                        <Route path="notices" element={<NoticeBoard />} />
                        <Route path="doubts" element={<DoubtSolving />} />
                        {/* More teacher routes added here as features are built */}
                    </Route>

                    {/* Catch-all fallback */}
                    <Route path="*" element={<RootRedirect />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App

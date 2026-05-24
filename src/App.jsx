import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './components/auth/LoginPage'
import DashboardLayout from './components/layout/DashboardLayout'
import DashboardHome from './components/features/DashboardHome'
import HomeworkHub from './components/features/HomeworkHub'
import Attendance from './components/features/Attendance'
import Timetable from './components/features/Timetable'
import DoubtSolving from './components/features/DoubtSolving'
import ReportCard from './components/features/ReportCard'
import NoticeBoard from './components/features/NoticeBoard'
import HelpCareBox from './components/features/HelpCareBox'
import PrepBox from './components/features/PrepBox'

import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />

                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<DashboardHome />} />
                        <Route path="homework" element={<HomeworkHub />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="timetable" element={<Timetable />} />
                        <Route path="doubts" element={<DoubtSolving />} />
                        <Route path="report-card" element={<ReportCard />} />
                        <Route path="notices" element={<NoticeBoard />} />
                        <Route path="help-care" element={<HelpCareBox />} />
                        <Route path="prep-box" element={<PrepBox />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App

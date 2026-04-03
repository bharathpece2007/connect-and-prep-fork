import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './components/auth/LoginPage'
import DashboardLayout from './components/layout/DashboardLayout'
import QuestionPapers from './components/features/QuestionPapers'
import Attendance from './components/features/Attendance'
import Library from './components/features/Library'
import Analysis from './components/features/Analysis'
import Notes from './components/features/Notes'
import DoubtSolving from './components/features/DoubtSolving'
import AcademicHub from './components/features/AcademicHub'
import StudyZone from './components/features/StudyZone'
import Alumni from './components/features/Alumni'
import DashboardHome from './components/features/DashboardHome'
import Profile from './components/features/Profile'
import Gamification from './components/features/Gamification'
import PlacementHub from './components/features/PlacementHub'
import Whiteboard from './components/features/Whiteboard'
import Timetable from './components/features/Timetable'
import ChatForum from './components/features/ChatForum'
import CGPACalculator from './components/features/CGPACalculator'
import ActivityFeed from './components/features/ActivityFeed'
import Challenges from './components/features/Challenges'
import PersonalNotes from './components/features/PersonalNotes'

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
                        <Route path="papers" element={<QuestionPapers />} />
                        <Route path="analysis" element={<Analysis />} />
                        <Route path="notes" element={<Notes />} />
                        <Route path="studyzone" element={<StudyZone />} />
                        <Route path="doubts" element={<DoubtSolving />} />
                        <Route path="academic" element={<AcademicHub />} />
                        <Route path="library" element={<Library />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="leaderboard" element={<Gamification />} />
                        <Route path="placements" element={<PlacementHub />} />
                        <Route path="whiteboard" element={<Whiteboard />} />
                        <Route path="timetable" element={<Timetable />} />
                        <Route path="chat" element={<ChatForum />} />
                        <Route path="cgpa" element={<CGPACalculator />} />
                        <Route path="feed" element={<ActivityFeed />} />
                        <Route path="challenges" element={<Challenges />} />
                        <Route path="my-notes" element={<PersonalNotes />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App

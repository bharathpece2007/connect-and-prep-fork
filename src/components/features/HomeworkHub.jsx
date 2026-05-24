import React, { useState, useEffect } from 'react';
import { Upload, Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import '../features/FeatureStyles.css';
import { useAuth } from '../../context/AuthContext';
import { homeworkService } from '../../services/supabaseService';

// Fallback static data (shown when DB is empty)
const STATIC_ASSIGNMENTS = [
    { id: 1, subject: 'Mathematics', title: 'Chapter 7 - Quadratic Equations Ex 4.2', due_date: '2026-05-16', status: 'assigned', color: '#FFC229' },
    { id: 2, subject: 'Science', title: 'Plant Cell Diagram & Labeling', due_date: '2026-05-17', status: 'submitted', color: '#4ade80' },
    { id: 3, subject: 'English', title: 'French Revolution Essay - 800 words', due_date: '2026-05-18', status: 'revision', color: '#f87171' },
    { id: 4, subject: 'Mathematics', title: 'Trigonometry Worksheet Set B', due_date: '2026-05-20', status: 'assigned', color: '#FFC229' },
    { id: 5, subject: 'Science', title: 'Chemistry Lab Report - Acids & Bases', due_date: '2026-05-25', status: 'assigned', color: '#4ade80' },
    { id: 6, subject: 'English', title: 'Shakespeare Sonnet Analysis', due_date: '2026-05-26', status: 'submitted', color: '#f87171' },
    { id: 7, subject: 'History', title: 'World War II Timeline', due_date: '2026-05-18', status: 'assigned', color: '#60a5fa' },
    { id: 8, subject: 'Computer Science', title: 'React Hooks Implementation', due_date: '2026-05-19', status: 'assigned', color: '#c084fc' },
    { id: 9, subject: 'Art', title: 'Still Life Sketch', due_date: '2026-05-22', status: 'submitted', color: '#fb923c' },
    { id: 10, subject: 'Physics', title: 'Kinematics Problems', due_date: '2026-05-17', status: 'revision', color: '#34d399' },
];

// Subject → color map (used when loading from DB, which won't have colors)
const SUBJECT_COLORS = {
    'Mathematics': '#FFC229', 'Science': '#4ade80', 'English': '#f87171',
    'History': '#60a5fa', 'Computer Science': '#c084fc', 'Art': '#fb923c',
    'Physics': '#34d399', 'Chemistry': '#4ade80', 'Social Studies': '#a78bfa',
};

const HomeworkHub = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState(STATIC_ASSIGNMENTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?._id) { setLoading(false); return; }
        homeworkService.getAll(user._id)
            .then(data => {
                if (data && data.length > 0) {
                    // Normalise DB fields: due_date is already correct
                    const normalised = data.map(h => ({
                        ...h,
                        due_date: h.due_date || h.due,
                        color: SUBJECT_COLORS[h.subject] || '#a78bfa',
                    }));
                    setAssignments(normalised);
                }
                // else: keep fallback static data
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [user?._id]);

    const handleStatusUpdate = async (id, newStatus) => {
        // Optimistic update
        setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        if (user?._id) {
            try {
                await homeworkService.updateStatus(id, newStatus);
            } catch {
                // If DB save fails, revert
                setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: a.status } : a));
            }
        }
    };

    const statusBadge = (status) => {
        const config = {
            assigned: { label: 'ASSIGNED', bg: '#FFC229', color: '#000' },
            submitted: { label: 'SUBMITTED', bg: '#4ade80', color: '#000' },
            revision: { label: 'NEEDS REVISION', bg: '#f87171', color: '#000' },
        };
        const c = config[status] || config.assigned;
        return (
            <span className="hw-status-badge" style={{ background: c.bg, color: c.color }}>
                {c.label}
            </span>
        );
    };

    const isVeryNear = (dateStr) => {
        if (!dateStr) return false;
        const due = new Date(dateStr);
        const today = new Date();
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= -1 && diffDays <= 2;
    };

    // Format the due date nicely (handles both 'May 16, 2026' and '2026-05-16' formats)
    const formatDue = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr.includes('-')) {
            return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        return dateStr;
    };

    const subjectGroups = {};
    assignments.forEach(a => {
        const subject = a.subject || 'General';
        if (!subjectGroups[subject]) subjectGroups[subject] = [];
        subjectGroups[subject].push(a);
    });

    if (loading) return <div className="feature-container"><p>Loading homework...</p></div>;

    return (
        <div className="feature-container">
            <div className="hw-grid">
                {Object.entries(subjectGroups).map(([subject, items]) => (
                    <div key={subject} className="card hw-subject-card">
                        <div className="hw-subject-header">
                            <div className="hw-subject-dot" style={{ background: items[0].color }} />
                            <h3>{subject}</h3>
                            <span className="hw-count">{items.length} assignments</span>
                        </div>
                        <div className="hw-items">
                            {items.map(item => {
                                const urgent = isVeryNear(item.due_date) && item.status !== 'submitted';
                                return (
                                <div key={item.id} className={`hw-item ${urgent ? 'urgent' : ''}`}>
                                    <div className="hw-item-top">
                                        <FileText size={16} color={item.color} />
                                        <span className="hw-item-title">{item.title}</span>
                                    </div>
                                    <div className="hw-item-bottom">
                                        <span className="hw-due">
                                            <Clock size={12} /> Due: {formatDue(item.due_date)}
                                        </span>
                                        {statusBadge(item.status)}
                                    </div>
                                    {item.status === 'assigned' && (
                                        <button
                                            className="hw-submit-btn"
                                            onClick={() => handleStatusUpdate(item.id, 'submitted')}
                                        >
                                            <Upload size={14} /> Submit File
                                        </button>
                                    )}
                                    {item.status === 'revision' && (
                                        <button
                                            className="hw-submit-btn revision-btn"
                                            onClick={() => handleStatusUpdate(item.id, 'submitted')}
                                        >
                                            <Upload size={14} /> Re-Submit
                                        </button>
                                    )}
                                </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeworkHub;

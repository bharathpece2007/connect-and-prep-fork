import React, { useState } from 'react';
import { Upload, Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import '../features/FeatureStyles.css';

const HomeworkHub = () => {
    const [assignments, setAssignments] = useState([
        { id: 1, subject: 'Mathematics', title: 'Chapter 7 - Quadratic Equations Ex 4.2', due: 'May 16, 2026', status: 'assigned', color: '#FFC229' },
        { id: 2, subject: 'Science', title: 'Plant Cell Diagram & Labeling', due: 'May 17, 2026', status: 'submitted', color: '#4ade80' },
        { id: 3, subject: 'English', title: 'French Revolution Essay - 800 words', due: 'May 18, 2026', status: 'revision', color: '#f87171' },
        { id: 4, subject: 'Mathematics', title: 'Trigonometry Worksheet Set B', due: 'May 20, 2026', status: 'assigned', color: '#FFC229' },
        { id: 5, subject: 'Science', title: 'Chemistry Lab Report - Acids & Bases', due: 'May 25, 2026', status: 'assigned', color: '#4ade80' },
        { id: 6, subject: 'English', title: 'Shakespeare Sonnet Analysis', due: 'May 26, 2026', status: 'submitted', color: '#f87171' },
        { id: 7, subject: 'History', title: 'World War II Timeline', due: 'May 18, 2026', status: 'assigned', color: '#60a5fa' },
        { id: 8, subject: 'Computer Science', title: 'React Hooks Implementation', due: 'May 19, 2026', status: 'assigned', color: '#c084fc' },
        { id: 9, subject: 'Art', title: 'Still Life Sketch', due: 'May 22, 2026', status: 'submitted', color: '#fb923c' },
        { id: 10, subject: 'Physics', title: 'Kinematics Problems', due: 'May 17, 2026', status: 'revision', color: '#34d399' },
    ]);

    const statusBadge = (status) => {
        const config = {
            assigned: { label: 'ASSIGNED', bg: '#FFC229', color: '#000' },
            submitted: { label: 'SUBMITTED', bg: '#4ade80', color: '#000' },
            revision: { label: 'NEEDS REVISION', bg: '#f87171', color: '#000' },
        };
        const c = config[status];
        return (
            <span className="hw-status-badge" style={{ background: c.bg, color: c.color }}>
                {c.label}
            </span>
        );
    };

    const isVeryNear = (dateStr) => {
        const due = new Date(dateStr);
        const today = new Date();
        // Calculate difference in days, ignoring time
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // If deadline is within 2 days and not already submitted
        return diffDays >= -1 && diffDays <= 2; 
    };

    const subjectGroups = {};
    assignments.forEach(a => {
        if (!subjectGroups[a.subject]) subjectGroups[a.subject] = [];
        subjectGroups[a.subject].push(a);
    });

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
                                const urgent = isVeryNear(item.due) && item.status !== 'submitted';
                                return (
                                <div key={item.id} className={`hw-item ${urgent ? 'urgent' : ''}`}>
                                    <div className="hw-item-top">
                                        <FileText size={16} color={item.color} />
                                        <span className="hw-item-title">{item.title}</span>
                                    </div>
                                    <div className="hw-item-bottom">
                                        <span className="hw-due">
                                            <Clock size={12} /> Due: {item.due}
                                        </span>
                                        {statusBadge(item.status)}
                                    </div>
                                    {item.status === 'assigned' && (
                                        <button className="hw-submit-btn">
                                            <Upload size={14} /> Submit File
                                        </button>
                                    )}
                                    {item.status === 'revision' && (
                                        <button className="hw-submit-btn revision-btn">
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

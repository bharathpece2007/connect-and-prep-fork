import React, { useState, useRef } from 'react';
import { Upload, Clock, CheckCircle, AlertTriangle, FileText, Plus } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import '../features/FeatureStyles.css';

const HomeworkHub = () => {
    const fileInputRef = useRef(null);
    const [activeAssignmentId, setActiveAssignmentId] = useState(null);
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

    const triggerFileInput = (id) => {
        setActiveAssignmentId(id);
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && activeAssignmentId) {
            setAssignments(prev => prev.map(a => 
                a.id === activeAssignmentId ? { ...a, status: 'submitted' } : a
            ));
            alert(`🎉 File "${file.name}" uploaded successfully!\nYour homework assignment has been submitted.`);
            setActiveAssignmentId(null);
        }
    };

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
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= -1 && diffDays <= 2; 
    };

    const { user } = useAuth();
    const isTeacher = user?.role === 'teacher';

    const [teacherTab, setTeacherTab] = useState('needs-grading');
    const [gradingStudent, setGradingStudent] = useState(null);

    const subjectGroups = {};
    assignments.forEach(a => {
        if (!subjectGroups[a.subject]) subjectGroups[a.subject] = [];
        subjectGroups[a.subject].push(a);
    });

    if (isTeacher) {
        if (gradingStudent) {
            return (
                <div className="feature-container" style={{ padding: '0', display: 'flex', height: '100vh', background: '#111' }}>
                    {/* Left Pane - Submission */}
                    <div style={{ flex: 1, borderRight: '1px solid #333', padding: '2rem', overflowY: 'auto' }}>
                        <button className="hw-submit-btn" style={{ background: '#333', color: '#fff', marginBottom: '2rem' }} onClick={() => setGradingStudent(null)}>← Back to List</button>
                        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>{gradingStudent.studentName}'s Submission</h2>
                        <h4 style={{ color: '#aaa', marginBottom: '2rem' }}>{gradingStudent.title}</h4>
                        <div style={{ background: '#222', padding: '2rem', borderRadius: '8px', minHeight: '400px', border: '1px solid #444' }}>
                            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                                (Student's uploaded PDF or text will be rendered here. For the French Revolution essay, the text focuses on the socio-economic disparities leading to the 1789 uprising...)
                            </p>
                        </div>
                    </div>
                    {/* Right Pane - Grading */}
                    <div style={{ width: '400px', padding: '2rem', background: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ color: '#FFC72C', marginBottom: '1.5rem' }}>Grading Rubric</h3>
                        
                        <label style={{ color: '#aaa', fontSize: '12px', marginBottom: '0.5rem' }}>Grade / Score</label>
                        <input type="text" placeholder="e.g. 85/100 or A-" style={{ background: '#000', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '1.5rem' }} />
                        
                        <label style={{ color: '#aaa', fontSize: '12px', marginBottom: '0.5rem' }}>Feedback Comments</label>
                        <textarea placeholder="Provide constructive feedback here..." style={{ background: '#000', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '6px', height: '150px', marginBottom: '1.5rem', resize: 'none' }} />
                        
                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            <button className="hw-submit-btn" style={{ background: '#f87171', color: '#000', flex: 1 }}>Needs Revision</button>
                            <button className="hw-submit-btn" style={{ background: '#FFC72C', color: '#000', flex: 1, fontWeight: 'bold' }} onClick={() => setGradingStudent(null)}>Submit Grade</button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="feature-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setTeacherTab('active')} style={{ padding: '8px 16px', background: teacherTab === 'active' ? '#FFC72C' : '#222', color: teacherTab === 'active' ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Active</button>
                        <button onClick={() => setTeacherTab('drafts')} style={{ padding: '8px 16px', background: teacherTab === 'drafts' ? '#FFC72C' : '#222', color: teacherTab === 'drafts' ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Drafts</button>
                        <button onClick={() => setTeacherTab('needs-grading')} style={{ padding: '8px 16px', background: teacherTab === 'needs-grading' ? '#FFC72C' : '#222', color: teacherTab === 'needs-grading' ? '#000' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Needs Grading (28)</button>
                    </div>
                    <button style={{ padding: '10px 20px', background: '#FFC72C', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={16} /> Create Assignment
                    </button>
                </div>

                <div className="hw-grid">
                    {teacherTab === 'needs-grading' ? (
                        <div className="card hw-subject-card" style={{ gridColumn: '1 / -1' }}>
                            <div className="hw-subject-header">
                                <div className="hw-subject-dot" style={{ background: '#FFC72C' }} />
                                <h3>Submissions Pending Review</h3>
                            </div>
                            <div className="hw-items">
                                <div className="hw-item">
                                    <div className="hw-item-top">
                                        <FileText size={16} color="#60a5fa" />
                                        <span className="hw-item-title">French Revolution Essay - 800 words</span>
                                    </div>
                                    <div className="hw-item-bottom">
                                        <span className="hw-due" style={{ color: '#aaa' }}>Submitted by: <strong>Ravi Kumar</strong></span>
                                        <span className="hw-status-badge" style={{ background: '#4ade80', color: '#000' }}>SUBMITTED</span>
                                    </div>
                                    <button className="hw-submit-btn" style={{ background: '#FFC72C', color: '#000', fontWeight: 'bold' }} onClick={() => setGradingStudent({ studentName: 'Ravi Kumar', title: 'French Revolution Essay - 800 words' })}>
                                        Grade Submission
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: '#aaa' }}>No {teacherTab} assignments right now.</p>
                    )}
                </div>
            </div>
        );
    }

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
                                        <button className="hw-submit-btn" onClick={() => triggerFileInput(item.id)}>
                                            <Upload size={14} /> Submit File
                                        </button>
                                    )}
                                    {item.status === 'revision' && (
                                        <button className="hw-submit-btn revision-btn" onClick={() => triggerFileInput(item.id)}>
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
            {/* Hidden native file input wrapper */}
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
            />
        </div>
    );
};

export default HomeworkHub;

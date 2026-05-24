<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mockBackend } from '../../services/mockBackend';
import { 
    Calendar, CheckCircle2, Clock, 
    Sparkles, Plus, X 
} from 'lucide-react';
import './FeatureStyles.css'; // Assuming existing styles

const HomeworkHub = () => {
    const location = useLocation();
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const years = [2024, 2025, 2026, 2027, 2028];

    const [filter, setFilter] = useState(location.state?.filter || 'All');
    const [homework, setHomework] = useState(mockBackend.homework || []);
    const [showAddTask, setShowAddTask] = useState(false);

    useEffect(() => {
        if (location.state?.filter) {
            setFilter(location.state.filter);
        }
    }, [location.state]);
    const [newTask, setNewTask] = useState({
        subject: 'Mathematics',
        title: '',
        day: new Date().getDate(),
        month: months[new Date().getMonth()],
        year: new Date().getFullYear(),
        priority: 'Medium'
    });
=======
import React, { useState, useRef } from 'react';
import { Upload, Clock, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
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
>>>>>>> 41146800e0a9b29044de3f30e724c130dae74304

    const triggerFileInput = (id) => {
        setActiveAssignmentId(id);
        fileInputRef.current.click();
    };

<<<<<<< HEAD
    const handleAddTask = (e) => {
        e.preventDefault();
        const task = {
            ...newTask,
            id: homework.length + 1,
            dueDate: `${newTask.day} ${newTask.month} ${newTask.year}`,
            status: 'Pending'
        };
        setHomework([task, ...homework]);
        setNewTask({
            subject: 'Mathematics',
            title: '',
            day: new Date().getDate(),
            month: months[new Date().getMonth()],
            year: new Date().getFullYear(),
            priority: 'Medium'
        });
        setShowAddTask(false);
    };

    const getPriorityColor = (priority) => {
        switch(priority.toLowerCase()) {
            case 'high': return 'var(--error)';
            case 'medium': return 'var(--accent-action)';
            case 'low': return 'var(--success)';
            default: return 'var(--text-secondary)';
=======
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && activeAssignmentId) {
            setAssignments(prev => prev.map(a => 
                a.id === activeAssignmentId ? { ...a, status: 'submitted' } : a
            ));
            alert(`🎉 File "${file.name}" uploaded successfully!\nYour homework assignment has been submitted.`);
            setActiveAssignmentId(null);
>>>>>>> 41146800e0a9b29044de3f30e724c130dae74304
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
<<<<<<< HEAD
            <div className="feature-header">
                <div className="header-text">
                    <h3>Homework Hub <Sparkles size={20} className="sparkle-icon" /></h3>
                    <p>Track your assignments and deadlines in real-time.</p>
                </div>
                <div className="header-actions">
                    <div className="filter-pills">
                        {['All', 'Pending', 'Completed'].map(f => (
                            <button 
                                key={f} 
                                className={`pill ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <button 
                        className={`add-task-btn ${showAddTask ? 'active' : ''}`}
                        onClick={() => setShowAddTask(!showAddTask)}
                    >
                        {showAddTask ? <X size={18} /> : <Plus size={18} />} 
                        {showAddTask ? 'Cancel' : 'New Task'}
                    </button>
                </div>
            </div>

            {showAddTask && (
                <div className="add-task-section card">
                    <form onSubmit={handleAddTask} className="task-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">SUBJECT</label>
                                <select 
                                    value={newTask.subject}
                                    onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                                    className="filter-select"
                                >
                                    {mockBackend.schoolSubjects.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">TASK TITLE</label>
                                <input 
                                    type="text"
                                    required
                                    placeholder="Enter task title..."
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    className="task-input"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">DUE DATE</label>
                                <div className="date-select-grid">
                                    <select 
                                        value={newTask.day}
                                        onChange={(e) => setNewTask({...newTask, day: e.target.value})}
                                        className="filter-select date-part"
                                    >
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    <select 
                                        value={newTask.month}
                                        onChange={(e) => setNewTask({...newTask, month: e.target.value})}
                                        className="filter-select date-part"
                                    >
                                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                    <select 
                                        value={newTask.year}
                                        onChange={(e) => setNewTask({...newTask, year: e.target.value})}
                                        className="filter-select date-part"
                                    >
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">PRIORITY</label>
                                <select 
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                                    className="filter-select"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="login-btn add-btn">ADD ASSIGNMENT</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="homework-grid">
                {filteredHomework.map(hw => (
                    <div key={hw.id} className={`hw-card ${hw.status.toLowerCase()}`}>
                        <div className="hw-status-indicator" style={{ background: getPriorityColor(hw.priority) }} />
                        <div className="hw-content">
                            <div className="hw-top">
                                <span className="hw-subject">{hw.subject}</span>
                                <span className="hw-priority" style={{ color: getPriorityColor(hw.priority) }}>
                                    {hw.priority} Priority
                                </span>
                            </div>
                            <h4 className="hw-title">{hw.title}</h4>
                            <div className="hw-footer">
                                <div className="hw-meta">
                                    <Calendar size={14} />
                                    <span>Due: {hw.dueDate}</span>
=======
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
>>>>>>> 41146800e0a9b29044de3f30e724c130dae74304
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

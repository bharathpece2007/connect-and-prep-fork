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

    const filteredHomework = homework.filter(hw => 
        filter === 'All' ? true : hw.status === filter
    );

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
        }
    };

    return (
        <div className="feature-container">
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
                                </div>
                                <div className={`hw-badge ${hw.status.toLowerCase()}`}>
                                    {hw.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                    {hw.status}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="stats-mini-grid">
                <div className="stat-box cyan">
                    <div className="stat-label">Completion Rate</div>
                    <div className="stat-value">68%</div>
                </div>
                <div className="stat-box purple">
                    <div className="stat-label">Pending Units</div>
                    <div className="stat-value">4</div>
                </div>
                <div className="stat-box orange">
                    <div className="stat-label">Reward Progress</div>
                    <div className="stat-value">450/500 XP</div>
                </div>
            </div>
        </div>
    );
};

export default HomeworkHub;

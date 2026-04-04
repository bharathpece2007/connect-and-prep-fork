import React, { useState } from 'react';
import { mockBackend } from '../../services/mockBackend';
import { 
    Calendar, CheckCircle2, Clock, AlertCircle, 
    BookOpen, Sparkles, Filter, Plus 
} from 'lucide-react';
import './FeatureStyles.css'; // Assuming existing styles

const HomeworkHub = () => {
    const [filter, setFilter] = useState('All');
    const homework = mockBackend.homework || [];

    const filteredHomework = homework.filter(hw => 
        filter === 'All' ? true : hw.status === filter
    );

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
                    <button className="add-task-btn">
                        <Plus size={18} /> New Task
                    </button>
                </div>
            </div>

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

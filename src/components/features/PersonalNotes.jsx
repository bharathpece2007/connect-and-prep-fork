import React, { useState } from 'react';
import { mockBackend } from '../../services/mockBackend';
import { Pin, Plus, CheckSquare, Square, Circle, Trash2 } from 'lucide-react';
import './FeatureStyles.css';

const PersonalNotes = () => {
    const [notes] = useState(mockBackend.personalNotes);
    const [todos, setTodos] = useState(mockBackend.todos);
    const [newTodo, setNewTodo] = useState('');

    const toggleTodo = (id) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const addTodo = () => {
        if (!newTodo.trim()) return;
        setTodos(prev => [...prev, { id: Date.now(), text: newTodo, done: false, priority: 'medium' }]);
        setNewTodo('');
    };

    const priorityColors = { high: 'var(--error)', medium: 'var(--accent-action)', low: 'var(--success)' };

    return (
        <div className="personal-notes-container animate-enter" style={{ padding: '2rem' }}>


            <div className="notes-todo-layout">
                {/* Self-Study Timetable (formerly Quick Notes) */}
                <div className="notes-section">
                    <div className="section-head">
                        <h3>Self-Study Timetable</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="icon-btn" title="Add Slot"><Plus size={18} /></button>
                        </div>
                    </div>
                    
                    <div className="tt-table-wrapper" style={{ marginTop: '1.5rem', border: '2px solid var(--border-color)' }}>
                        <table className="tt-excel-table">
                            <thead>
                                <tr>
                                    <th className="tt-corner-header" style={{ width: '80px', minWidth: '80px' }}>DAY</th>
                                    {mockBackend.selfStudyTimetable.periods.map((p, i) => (
                                        <th key={i} className="tt-period-header" style={{ fontSize: '0.65rem', padding: '10px 4px' }}>{p}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {mockBackend.selfStudyTimetable.schedule.map((dayObj) => {
                                    const slotsMap = {};
                                    dayObj.slots.forEach(s => slotsMap[s.period] = s);
                                    const consumed = new Set();
                                    dayObj.slots.forEach(s => {
                                        if (s.span > 1) {
                                            for (let i = 1; i < s.span; i++) consumed.add(s.period + i);
                                        }
                                    });

                                    return (
                                        <tr key={dayObj.day} className="tt-row">
                                            <td className="tt-day-cell" style={{ width: '80px', minWidth: '80px', fontSize: '0.65rem' }}>
                                                {dayObj.day.toUpperCase()}
                                            </td>
                                            {[1, 2, 3].map(p => {
                                                if (consumed.has(p)) return null;
                                                const slot = slotsMap[p];
                                                if (!slot) {
                                                    return (
                                                        <td key={p} className="tt-cell tt-empty">
                                                            <span className="tt-empty-dash">—</span>
                                                        </td>
                                                    );
                                                }
                                                // Using semi-random colors or consistent ones
                                                const colors = {
                                                    'Mathematics': '#22c55e',
                                                    'Physics': '#94a3b8',
                                                    'Electronics': '#4d7cff',
                                                    'Programming': '#ef4444',
                                                    'Chemistry': '#a855f7',
                                                    'Full Mock Test': '#f59e0b',
                                                    'Project Work': '#06b6d4'
                                                };
                                                const bgColor = colors[slot.subject] || 'var(--accent-primary)';
                                                return (
                                                    <td key={p} className="tt-cell tt-filled" colSpan={slot.span || 1}>
                                                        <div className="tt-subject-cell" style={{ 
                                                            background: bgColor, 
                                                            color: '#fff',
                                                            padding: '8px 4px',
                                                            minHeight: '60px'
                                                        }}>
                                                            <span className="tt-subject-name" style={{ fontSize: '0.7rem' }}>{slot.subject}</span>
                                                            <span className="tt-subject-type" style={{ fontSize: '0.55rem', opacity: 0.9 }}>{slot.goal}</span>
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* To-Do List */}
                <div className="todo-section">
                    <div className="section-head">
                        <h3>To-Do List</h3>
                        <span className="todo-count">{todos.filter(t => !t.done).length} remaining</span>
                    </div>

                    <div className="todo-input-bar">
                        <input
                            type="text"
                            placeholder="Add a new task..."
                            value={newTodo}
                            onChange={e => setNewTodo(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addTodo()}
                        />
                        <button className="send-btn" onClick={addTodo}><Plus size={18} /></button>
                    </div>

                    <div className="todo-list">
                        {todos.map(todo => (
                            <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`} onClick={() => toggleTodo(todo.id)}>
                                {todo.done ? <CheckSquare size={20} color="var(--success)" /> : <Square size={20} />}
                                <span className="todo-text">{todo.text}</span>
                                <span className="priority-dot" style={{ background: priorityColors[todo.priority] }}></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalNotes;

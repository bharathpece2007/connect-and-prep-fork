import React, { useState } from 'react';
import { mockBackend } from '../../services/mockBackend';
import { FileText, Download, User, Star, Clock, BookOpen, AlertCircle } from 'lucide-react';
import './FeatureStyles.css';

const Notes = () => {
    const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'pyqs'
    const { studyMaterials, pyqs } = mockBackend;

    const teacherNotes = studyMaterials.filter(n => n.category === 'Teacher Note');
    const studentNotes = studyMaterials.filter(n => n.category === 'Best Student Note');

    return (
        <div className="feature-container">
            <div className="feature-header">
                <h1>Resources & PYQs</h1>
                <div className="role-toggle" style={{ margin: 0, width: '300px' }}>
                    <button
                        className={`toggle-btn ${activeTab === 'notes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notes')}
                    >
                        Notes & Materials
                    </button>
                    <button
                        className={`toggle-btn ${activeTab === 'pyqs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pyqs')}
                    >
                        Previous Year Qs
                    </button>
                </div>
            </div>

            {activeTab === 'notes' ? (
                <div className="feature-content">
                    <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#646cff' }}>
                        <BookOpen size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                        Teacher's Curated Notes
                    </h3>
                    <div className="papers-grid" style={{ marginBottom: '3rem' }}>
                        {teacherNotes.map((item) => (
                            <div key={item.id} className="paper-card">
                                <div className="paper-icon"><FileText size={32} color="#646cff" /></div>
                                <div className="paper-info">
                                    <h3>{item.title}</h3>
                                    <div className="meta">By {item.author}</div>
                                </div>
                                <button className="download-btn"><Download size={16} /> Download</button>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#f59e0b' }}>
                        <Star size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                        Best Student Short Notes & Mindmaps
                    </h3>
                    <div className="papers-grid">
                        {studentNotes.map((item) => (
                            <div key={item.id} className="paper-card" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                                <div className="paper-icon"><FileText size={32} color="#f59e0b" /></div>
                                <div className="paper-info">
                                    <h3>{item.title}</h3>
                                    <div className="meta">
                                        By {item.author}
                                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#4ade80', marginTop: '4px' }}>
                                            Verified by {item.verifiedBy}
                                        </span>
                                    </div>
                                </div>
                                <button className="download-btn"><Download size={16} /> Download</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="pyq-list">
                    <div className="card" style={{ padding: '0' }}>
                        {pyqs.map((q, idx) => (
                            <div key={q.id} style={{
                                padding: '1.5rem',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'start'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{q.question}</h3>
                                    <span style={{
                                        background: '#333',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        color: '#ccc'
                                    }}>
                                        {q.subject}
                                    </span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '150px' }}>
                                        {q.yearsAsked.map(year => (
                                            <span key={year} style={{
                                                background: '#f8717120',
                                                color: '#f87171',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {year}
                                            </span>
                                        ))}
                                    </div>
                                    <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>Years Asked</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;

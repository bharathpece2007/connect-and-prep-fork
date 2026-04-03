import React, { useState } from 'react';
import { mockBackend } from '../../services/mockBackend';
import { Play, Clock, Eye, Filter } from 'lucide-react';
import './FeatureStyles.css';

const Lectures = () => {
    const { lectures, subjects } = mockBackend;
    const [filter, setFilter] = useState('');

    const filtered = filter ? lectures.filter(l => l.subject === filter) : lectures;

    return (
        <div className="lectures-container animate-enter" style={{ padding: '2rem' }}>
            <div className="filter-bar" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '12px', width: 'fit-content' }}>
                <Filter size={16} />
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem' }}
                >
                    <option value="">All Subjects</option>
                    {[...new Set(lectures.map(l => l.subject))].map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            <div className="lectures-grid">
                {filtered.map((lec, i) => (
                    <div key={lec.id} className="lecture-card" style={{ animationDelay: `${i * 80}ms` }}>
                        <div className="lecture-thumb">
                            <Play size={40} />
                            <span className="duration-badge"><Clock size={12} /> {lec.duration}</span>
                        </div>
                        <div className="lecture-info">
                            <span className="lec-subject">{lec.subject} — {lec.unit}</span>
                            <h3>{lec.title}</h3>
                            <div className="lec-meta">
                                <span>{lec.teacher}</span>
                                <span><Eye size={14} /> {lec.views} views</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Lectures;

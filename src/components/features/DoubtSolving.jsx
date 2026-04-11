import React, { useState } from 'react';
import { mockBackend } from '../../services/mockBackend';
import { MessageCircle, Video, Upload, User, Check, Clock, Mic } from 'lucide-react';
import './FeatureStyles.css';

const DoubtSolving = () => {
    const { doubts, tutors } = mockBackend;
    const [askMode, setAskMode] = useState(false);
    const [matching, setMatching] = useState(false);
    const [matchedTutor, setMatchedTutor] = useState(null);
    const [doubtText, setDoubtText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleAskDoubt = (e) => {
        e.preventDefault();
        setMatching(true);

        // Simulate AI Matching
        setTimeout(() => {
            // Find a random tutor for demo
            const tutor = tutors[Math.floor(Math.random() * tutors.length)];
            setMatchedTutor(tutor);
            setMatching(false);
        }, 2000);
    };

    const handleJoinCall = () => {
        alert(`Connecting to secure Video Call with ${matchedTutor.name}...`);
    };

    return (
        <div className="feature-container">
            <div className="doubt-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                {/* Left Column: Ask Doubt Form */}
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                    {!matchedTutor ? (
                        <>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Upload Your Doubt</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Our AI will find the best expert for you instantly.</p>

                            {matching ? (
                                <div style={{ padding: '2rem' }}>
                                    <div className="spinner" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '4px solid #333', borderTop: '4px solid #646cff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                    <p>Analyzing Topic...</p>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Matching with active tutors...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleAskDoubt} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <textarea
                                        placeholder="Type your question here or paste text..."
                                        className="filter-select"
                                        style={{ minHeight: '200px', cursor: 'text', fontSize: '1rem', padding: '1rem' }}
                                        value={doubtText}
                                        onChange={(e) => setDoubtText(e.target.value)}
                                        required
                                    />

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div className="file-upload-box" style={{ flex: 1, border: '2px dashed var(--border-color)', padding: '1.5rem', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                            <input type="file" id="doubt-file" style={{ display: 'none' }} onChange={(e) => setSelectedFile(e.target.files[0])} />
                                            <label htmlFor="doubt-file" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                                <Upload size={24} style={{ color: 'var(--accent-primary)' }} />
                                                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{selectedFile ? selectedFile.name : 'Upload Photo / Video'}</span>
                                            </label>
                                        </div>
                                        <div className="file-upload-box" style={{ flex: 1, border: '2px dashed var(--border-color)', padding: '1.5rem', borderRadius: '12px', cursor: 'pointer', opacity: 0.7 }}>
                                            <Mic size={24} style={{ color: 'var(--error)' }} />
                                            <span style={{ fontSize: '0.9rem', display: 'block', marginTop: '0.5rem', fontWeight: 'bold' }}>Record Audio</span>
                                        </div>
                                    </div>

                                    <button type="submit" className="login-btn" style={{ padding: '1rem', fontSize: '1.1rem' }}>Find Tutor Now</button>
                                </form>
                            )}
                        </>
                    ) : (
                        <div style={{ animation: 'fadeIn 0.5s ease' }}>
                            <div style={{ width: '100px', height: '100px', background: '#333', borderRadius: '50%', margin: '0 auto 1.5rem', border: '4px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={48} color="#fff" />
                            </div>
                            <h2 style={{ color: '#4ade80', margin: '0.5rem 0' }}>It's a Match!</h2>
                            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{matchedTutor.name}</h3>
                            <p style={{ color: '#888', margin: '0.5rem 0 2rem' }}>Expert in {matchedTutor.specialization.join(', ')}</p>

                            <button className="login-btn" style={{ fontSize: '1.2rem', padding: '1rem' }} onClick={handleJoinCall}>
                                <Video size={24} style={{ marginRight: '10px' }} /> Join Video Call
                            </button>
                            <button type="button" className="icon-btn" style={{ background: 'transparent', border: 'none', marginTop: '1rem', width: '100%' }} onClick={() => setMatchedTutor(null)}>Cancel</button>
                        </div>
                    )}
                </div>

                {/* Right Column: History Sidebar */}
                <div style={{ paddingLeft: '0', height: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Previous Doubts</h3>
                        <span style={{ background: '#333', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>{doubts.length}</span>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem', maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', paddingRight: '0.5rem' }}>
                        {doubts.map((d) => (
                            <div key={d.id} className="card" style={{ padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', lineHeight: '1.4' }}>{d.question}</h4>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{d.subject}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#888' }}>2 hrs ago</span>
                                    <span style={{ color: d.status === 'Resolved' ? '#4ade80' : '#f59e0b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                                        {d.status === 'Resolved' ? <Check size={14} /> : <Clock size={14} />} {d.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default DoubtSolving;

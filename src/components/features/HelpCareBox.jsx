import React, { useState } from 'react';
import { Shield, Lock, Send, CheckSquare, Square, Heart, AlertTriangle } from 'lucide-react';
import '../features/FeatureStyles.css';

const HelpCareBox = () => {
    const [message, setMessage] = useState('');
    const [anonymous, setAnonymous] = useState(true);
    const [category, setCategory] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const categories = [
        { id: 'bullying', label: 'Bullying', icon: '🛡️', color: '#f87171' },
        { id: 'stress', label: 'Mental Stress', icon: '🧠', color: '#a78bfa' },
        { id: 'counselor', label: 'Talk to Counselor', icon: '💬', color: '#4ade80' },
        { id: 'other', label: 'Other Concern', icon: '📝', color: '#FFC229' },
    ];

    const handleSubmit = () => {
        if (!message.trim() || !category) return;
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setMessage('');
            setCategory('');
        }, 4000);
    };

    return (
        <div className="feature-container">
            {/* Header */}
            <div className="card hc-header-card">
                <div className="hc-header-content">
                    <Heart size={32} color="#f87171" />
                    <div>
                        <h2 className="hc-title">Help & Care Box</h2>
                        <p className="hc-subtitle">
                            This is a safe, private space. Everything you share here is confidential and will only be seen by the school counselor.
                        </p>
                    </div>
                </div>
                <div className="hc-privacy-badge">
                    <Lock size={14} /> 100% Private & Secure
                </div>
            </div>

            {submitted ? (
                <div className="card hc-success-card">
                    <div className="hc-success-icon">✓</div>
                    <h3>Your message has been submitted safely</h3>
                    <p>The school counselor will review your concern. {anonymous ? 'Your identity is protected.' : 'Your name has been included.'}</p>
                </div>
            ) : (
                <div className="hc-form-layout">
                    {/* Category Selection */}
                    <div className="hc-category-grid">
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                className={`card hc-category-card ${category === cat.id ? 'selected' : ''}`}
                                onClick={() => setCategory(cat.id)}
                                style={category === cat.id ? { borderColor: cat.color, boxShadow: `0 0 12px ${cat.color}33` } : {}}
                            >
                                <span className="hc-cat-icon">{cat.icon}</span>
                                <span className="hc-cat-label">{cat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Message Form */}
                    <div className="card hc-form-card">
                        <h3>Share Your Concern</h3>
                        <textarea
                            className="hc-textarea"
                            placeholder="You can type anything here. This is a safe space. No one will judge you."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            rows={6}
                        />

                        {/* Anonymous Toggle */}
                        <div className="hc-anon-toggle" onClick={() => setAnonymous(!anonymous)}>
                            {anonymous ?
                                <CheckSquare size={20} color="#4ade80" /> :
                                <Square size={20} color="#888" />
                            }
                            <span>Submit Anonymously</span>
                            <span className="hc-anon-hint">
                                {anonymous ? 'Your name will NOT be shared' : 'Your name will be included'}
                            </span>
                        </div>

                        <button
                            className="action-btn hc-submit-btn"
                            onClick={handleSubmit}
                            disabled={!message.trim() || !category}
                        >
                            <Send size={16} /> Submit Safely
                        </button>
                    </div>
                </div>
            )}

            {/* Bottom Info */}
            <div className="hc-info-bar">
                <AlertTriangle size={14} color="#FFC229" />
                <span>If you are in immediate danger, please contact your teacher or call the helpline: <strong>1098</strong></span>
            </div>
        </div>
    );
};

export default HelpCareBox;

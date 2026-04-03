import React, { useState, useEffect } from 'react';
import { extraAPI } from '../../services/api';
import { Briefcase, Building2, GraduationCap, Lock, Unlock, ArrowUpRight, Search } from 'lucide-react';
import './FeatureStyles.css';

const PlacementHub = () => {
    const [placements, setPlacements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlacements = async () => {
            const data = await extraAPI.getPlacements();
            if (data.length === 0) {
                // Demo Data
                setPlacements([
                    { id: 1, type: 'Internship', company: 'Microsoft', role: 'Software Research Intern', stipend: '₹80,000/pm', rounds: ['OA', 'Tech 1', 'Tech 2', 'HR'], vault: true },
                    { id: 2, type: 'Full-time', company: 'Atlassian', role: 'Graduate Engineer', package: '42 LPA', rounds: ['Coding', 'System Design', 'Values'], vault: true },
                    { id: 3, type: 'Internship', company: 'Adobe', role: 'Product Intern', stipend: '₹1,00,000/pm', rounds: ['Portfolio Review', 'Design Task', 'HR'], vault: false },
                ]);
            } else {
                setPlacements(data);
            }
            setLoading(false);
        };
        fetchPlacements();
    }, []);

    if (loading) return <div>Exploring opportunities...</div>;

    return (
        <div className="placement-container animate-enter">

            <div className="search-wrapper" style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-card)',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                marginBottom: '2rem',
                gap: '10px'
            }}>
                <Search size={18} color="var(--text-secondary)" />
                <input
                    type="text"
                    placeholder="Search companies or roles..."
                    style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        flex: 1
                    }}
                />
            </div>
            <div className="placement-grid">
                {placements.map(job => (
                    <div key={job.id} className="job-card">
                        <div className="job-badge">{job.type}</div>
                        <div className="job-header">
                            <div className="company-logo">
                                <Building2 size={32} />
                            </div>
                            <div className="job-title">
                                <h3>{job.role}</h3>
                                <span>{job.company}</span>
                            </div>
                        </div>

                        <div className="job-details">
                            <div className="detail-item">
                                <span className="label">Package/Stipend</span>
                                <span className="value">{job.package || job.stipend}</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Interview Rounds</span>
                                <div className="rounds-tags">
                                    {job.rounds.map((round, i) => (
                                        <span key={i} className="round-tag">{round}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="job-footer">
                            <button className={`vault-btn ${job.vault ? 'accessible' : 'locked'}`}>
                                {job.vault ? <Unlock size={16} /> : <Lock size={16} />}
                                <span>Interview Vault</span>
                            </button>
                            <button className="apply-btn">
                                Apply <ArrowUpRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <section className="alumni-referral-section">
                <h3>Ask for Referral</h3>
                <div className="referral-banner">
                    <GraduationCap size={40} />
                    <div className="banner-text">
                        <h4>Talk to Alumni working at these companies</h4>
                        <p>Get tips and direct referrals to land your dream job.</p>
                    </div>
                    <button className="primary-btn-brutal">View Alumni Directory</button>
                </div>
            </section>
        </div>
    );
};

export default PlacementHub;

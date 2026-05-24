import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, BookOpen, User } from 'lucide-react';
import './LoginPage.css';
import './RegisterPage.css';

const RegisterPage = () => {
    const [step, setStep] = useState(1); // 1 = choose role, 2 = fill form
    const [role, setRole] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        usn: '',           // student only
        subject: '',       // teacher only
        employeeId: '',    // teacher only
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep(2);
        setError('');
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim()) return setError('Name is required.');
        if (!formData.email.trim()) return setError('Email is required.');
        if (formData.password.length < 6) return setError('Password must be at least 6 characters.');
        if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');
        if (role === 'student' && !formData.usn.trim()) return setError('USN is required for students.');

        setLoading(true);
        const result = await register({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role,
            usn: role === 'student' ? formData.usn.trim() : null,
        });

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Registration failed. Please try again.');
        }
        setLoading(false);
    };

    // ── Step 1: Role selection ──────────────────────────────────
    if (step === 1) {
        return (
            <div className="login-container">
                <div className="login-card register-card">
                    <div className="login-header">
                        <div className="logo-icon">
                            <GraduationCap size={64} strokeWidth={1.5} />
                        </div>
                        <h1>CONNECT &amp; PREP</h1>
                    </div>

                    <p className="reg-subtitle">CREATE ACCOUNT — SELECT YOUR ROLE</p>

                    <div className="role-selector-grid">
                        <button
                            className="role-card"
                            onClick={() => handleRoleSelect('student')}
                        >
                            <div className="role-card-icon student-icon">
                                <User size={40} strokeWidth={1.5} />
                            </div>
                            <span className="role-card-label">STUDENT</span>
                            <span className="role-card-desc">Access homework, attendance, doubts &amp; more</span>
                        </button>

                        <button
                            className="role-card"
                            onClick={() => handleRoleSelect('teacher')}
                        >
                            <div className="role-card-icon teacher-icon">
                                <BookOpen size={40} strokeWidth={1.5} />
                            </div>
                            <span className="role-card-label">TEACHER</span>
                            <span className="role-card-desc">Manage classes, post notices, track students</span>
                        </button>
                    </div>

                    <div className="reg-footer">
                        Already have an account?{' '}
                        <Link to="/login" className="reg-link">LOGIN</Link>
                    </div>
                </div>
            </div>
        );
    }

    // ── Step 2: Fill registration form ─────────────────────────
    return (
        <div className="login-container">
            <div className="login-card register-card">
                <div className="login-header">
                    <div className="logo-icon">
                        <GraduationCap size={48} strokeWidth={1.5} />
                    </div>
                    <h1>CONNECT &amp; PREP</h1>
                </div>

                <div className="reg-role-badge" data-role={role}>
                    {role === 'student' ? <User size={14} /> : <BookOpen size={14} />}
                    {role.toUpperCase()} REGISTRATION
                </div>

                <form onSubmit={handleRegister} className="login-form reg-form">
                    {/* Full Name */}
                    <div className="form-group">
                        <div>
                            <label>FULL NAME</label>
                            <span className="separator">&raquo;</span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <div>
                            <label>EMAIL ID</label>
                            <span className="separator">&raquo;</span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* USN — students only */}
                    {role === 'student' && (
                        <div className="form-group">
                            <div>
                                <label>USN</label>
                                <span className="separator">&raquo;</span>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="usn"
                                    placeholder="e.g. 4VV25EC001"
                                    value={formData.usn}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    )}

                    {/* Employee ID — teachers only */}
                    {role === 'teacher' && (
                        <div className="form-group">
                            <div>
                                <label>EMPLOYEE ID</label>
                                <span className="separator">&raquo;</span>
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="employeeId"
                                    placeholder="e.g. TCH2025001"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    )}

                    {/* Password */}
                    <div className="form-group">
                        <div>
                            <label>PASSWORD</label>
                            <span className="separator">&raquo;</span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                name="password"
                                placeholder="Min 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <div>
                            <label>CONFIRM</label>
                            <span className="separator">&raquo;</span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                    </button>
                </form>

                <div className="reg-footer" style={{ marginTop: '1.5rem' }}>
                    <button className="reg-back-btn" onClick={() => setStep(1)}>
                        ← CHANGE ROLE
                    </button>
                    <span style={{ color: 'var(--text-secondary)' }}>•</span>
                    <Link to="/login" className="reg-link">LOGIN</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

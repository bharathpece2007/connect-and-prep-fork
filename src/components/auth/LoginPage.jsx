import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, GraduationCap, School } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        let role = 'student';
        let demoEmail = email;
        let demoPass = password || 'password';

        if (email === '1') {
            role = 'student';
            demoEmail = 'student@test.com';
            demoPass = 'password';
        } else if (email === '2') {
            role = 'teacher';
            demoEmail = 'teacher@test.com';
            demoPass = 'password';
        } else if (email === '3') {
            role = 'parent';
            demoEmail = 'parent@test.com';
            demoPass = 'password';
        } else if (!email) {
            demoEmail = 'student@test.com';
        }

        const result = await login(demoEmail, demoPass, role);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-icon">
                        <GraduationCap size={64} strokeWidth={1.5} />
                    </div>
                    <h1>CONNECT & PREP</h1>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <div>
                            <label>EMAIL ID / USN</label>
                            <span className="separator">&raquo;</span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Enter 1 (Student), 2 (Teacher), 3 (Parent)"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div>
                            <label>PASSWORD</label>
                            <span className="separator">&raquo;</span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'LOGGING IN...' : 'LOGIN'}
                    </button>

                    <div style={{ marginTop: '1.25rem', textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        New here?{' '}
                        <Link to="/register" style={{ color: 'var(--text-primary)', fontWeight: 800, letterSpacing: '1px', borderBottom: '2px solid var(--border-color)', paddingBottom: '1px', textDecoration: 'none' }}>
                            CREATE ACCOUNT
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

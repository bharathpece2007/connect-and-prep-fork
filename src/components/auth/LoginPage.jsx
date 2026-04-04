import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, GraduationCap, School } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
    const [role, setRole] = useState('student');
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

        const demoEmail = email || `${role}@test.com`;
        const demoPass = password || 'password';

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



                <div className="role-selector">
                    {['student', 'teacher', 'parent'].map(r => (
                        <button
                            key={r}
                            type="button"
                            className={`role-tab ${role === r ? 'active' : ''}`}
                            onClick={() => setRole(r)}
                        >
                            {r.toUpperCase()}
                        </button>
                    ))}
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
                                placeholder={`${role}@test.com`}
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
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

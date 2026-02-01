import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, GraduationCap, School } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
    const [isStudent, setIsStudent] = useState(true);
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

        // For demo convenience, pre-fill if empty
        const demoEmail = email || (isStudent ? 'student@test.com' : 'teacher@test.com');
        const demoPass = password || 'password';

        const result = await login(demoEmail, demoPass, isStudent ? 'student' : 'teacher');

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
                        {isStudent ? <GraduationCap size={48} /> : <School size={48} />}
                    </div>
                    <h1>Connect & Prep</h1>
                    <p>{isStudent ? 'Student Portal' : 'Teacher Portal'}</p>
                </div>

                <div className="role-toggle">
                    <button
                        className={`toggle-btn ${isStudent ? 'active' : ''}`}
                        onClick={() => setIsStudent(true)}
                    >
                        Student
                    </button>
                    <button
                        className={`toggle-btn ${!isStudent ? 'active' : ''}`}
                        onClick={() => setIsStudent(false)}
                    >
                        Teacher
                    </button>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder={isStudent ? "student@test.com" : "teacher@test.com"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="demo-hint">
                    <p>Demo Credentials:</p>
                    <small>{isStudent ? 'student@test.com' : 'teacher@test.com'} / password</small>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

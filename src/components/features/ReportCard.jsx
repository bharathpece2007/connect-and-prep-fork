import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, Award, MessageSquare } from 'lucide-react';
import '../features/FeatureStyles.css';
import { useAuth } from '../../context/AuthContext';
import { reportCardService } from '../../services/supabaseService';

const ReportCard = () => {
    const { user } = useAuth();
    const [selectedTerm, setSelectedTerm] = useState('Term 2');
    // dbReportData will hold Supabase data if available (reserved for future use with teacher-entered grades)
    const [dbReportData, setDbReportData] = useState(null);

    useEffect(() => {
        if (!user?._id) return;
        reportCardService.getAll(user._id)
            .then(data => { if (data && data.length > 0) setDbReportData(data); })
            .catch(() => {});
    }, [user?._id]);

    const terms = ['Term 1', 'Term 2', 'Term 3'];

    const termData = {
        'Term 1': {
            exams: [
                { subject: 'Mathematics', unitTest: 38, terminal: 82, grade: 'A', remarks: 'Excellent problem-solving skills.' },
                { subject: 'Science', unitTest: 35, terminal: 78, grade: 'B+', remarks: 'Good understanding, improve diagrams.' },
                { subject: 'English', unitTest: 42, terminal: 88, grade: 'A+', remarks: 'Outstanding writing skills.' },
                { subject: 'Social Studies', unitTest: 30, terminal: 72, grade: 'B', remarks: 'Needs to revise map-work.' },
                { subject: 'Hindi', unitTest: 36, terminal: 80, grade: 'A', remarks: 'Very good comprehension.' },
                { subject: 'Computer Science', unitTest: 44, terminal: 92, grade: 'A+', remarks: 'Exceptional performance.' },
            ],
            percentage: 82,
        },
        'Term 2': {
            exams: [
                { subject: 'Mathematics', unitTest: 42, terminal: 88, grade: 'A+', remarks: 'Great improvement in geometry.' },
                { subject: 'Science', unitTest: 38, terminal: 84, grade: 'A', remarks: 'Lab work is excellent.' },
                { subject: 'English', unitTest: 40, terminal: 86, grade: 'A', remarks: 'Strong vocabulary usage.' },
                { subject: 'Social Studies', unitTest: 34, terminal: 78, grade: 'B+', remarks: 'History section needs work.' },
                { subject: 'Hindi', unitTest: 38, terminal: 82, grade: 'A', remarks: 'Consistently good.' },
                { subject: 'Computer Science', unitTest: 46, terminal: 94, grade: 'A+', remarks: 'Top of the class.' },
            ],
            percentage: 85,
        },
        'Term 3': {
            exams: [
                { subject: 'Mathematics', unitTest: 44, terminal: 90, grade: 'A+', remarks: 'Excellent throughout.' },
                { subject: 'Science', unitTest: 40, terminal: 86, grade: 'A', remarks: 'Strong conceptual clarity.' },
                { subject: 'English', unitTest: 44, terminal: 92, grade: 'A+', remarks: 'Best essay writer in class.' },
                { subject: 'Social Studies', unitTest: 36, terminal: 80, grade: 'A', remarks: 'Significant improvement.' },
                { subject: 'Hindi', unitTest: 40, terminal: 84, grade: 'A', remarks: 'Excellent handwriting.' },
                { subject: 'Computer Science', unitTest: 48, terminal: 96, grade: 'A+', remarks: 'Outstanding.' },
            ],
            percentage: 88,
        },
    };

    const trendData = [
        { term: 'T1', Mathematics: 82, Science: 78, English: 88, 'Social Studies': 72, Hindi: 80, 'Computer Science': 92 },
        { term: 'T2', Mathematics: 88, Science: 84, English: 86, 'Social Studies': 78, Hindi: 82, 'Computer Science': 94 },
        { term: 'T3', Mathematics: 90, Science: 86, English: 92, 'Social Studies': 80, Hindi: 84, 'Computer Science': 96 },
    ];

    const current = termData[selectedTerm];
    const gradeColors = { 'A+': '#FFC229', 'A': '#4ade80', 'B+': '#a78bfa', 'B': '#f472b6', 'C': '#f87171' };

    return (
        <div className="feature-container">
            {/* Term Selector */}
            <div className="rc-term-row">
                {terms.map(t => (
                    <button
                        key={t}
                        className={`rc-term-btn ${selectedTerm === t ? 'active' : ''}`}
                        onClick={() => setSelectedTerm(t)}
                    >
                        {t}
                    </button>
                ))}
                <div className="rc-overall">
                    <Award size={18} color="#FFC229" />
                    <span>Overall: <strong>{current.percentage}%</strong></span>
                </div>
            </div>

            {/* Scores Table */}
            <div className="card rc-table-card">
                <table className="rc-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Unit Test (/50)</th>
                            <th>Terminal (/100)</th>
                            <th>Grade</th>
                            <th>Teacher Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {current.exams.map((exam, i) => (
                            <tr key={i}>
                                <td className="rc-subject">{exam.subject}</td>
                                <td>{exam.unitTest}</td>
                                <td>{exam.terminal}</td>
                                <td>
                                    <span className="rc-grade" style={{ background: gradeColors[exam.grade] || '#666' }}>
                                        {exam.grade}
                                    </span>
                                </td>
                                <td className="rc-remarks">
                                    <MessageSquare size={12} /> {exam.remarks}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Trend Graph */}
            <div className="card rc-chart-card">
                <div className="rc-chart-header">
                    <TrendingUp size={18} color="#FFC229" />
                    <h3>Grade Trends Across Terms</h3>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="term" tick={{ fill: '#888' }} axisLine={false} />
                        <YAxis tick={{ fill: '#888' }} axisLine={false} domain={[60, 100]} />
                        <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
                        <Legend />
                        <Line type="monotone" dataKey="Mathematics" stroke="#FFC229" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="Science" stroke="#4ade80" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="English" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="Social Studies" stroke="#f472b6" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="Hindi" stroke="#f87171" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="Computer Science" stroke="#38bdf8" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReportCard;

import React, { useState } from 'react';
import { Search, FileText, Download, Filter, Upload, Plus, Trash2 } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import './FeatureStyles.css';

const QuestionPapers = () => {
    const { user } = useAuth();
    const [papers, setPapers] = useState(mockBackend.questionPapers);

    // Filters
    const [year, setYear] = useState('');
    const [college, setCollege] = useState('');
    const [subject, setSubject] = useState('');
    const [examType, setExamType] = useState('');

    // Filtering Logic
    const filteredPapers = papers.filter(p => {
        return (!year || p.year === year) &&
            (!college || p.college === college) &&
            (!subject || p.subject === subject) &&
            (!examType || p.type === examType);
    });

    // Mock Upload Logic
    const handleUpload = () => {
        // Simple prompt for demo purposes
        alert("In a real app, this would open a file picker and upload to the specific folder path: " +
            `${year || 'Year'}/${college || 'College'}/${subject || 'Subject'}/${examType || 'Exam'}`);

        // Simulating a successful upload
        if (year && college && subject && examType) {
            const newPaper = {
                id: Date.now(),
                year,
                college,
                subject,
                type: examType,
                file: `uploaded_${Date.now()}.pdf`
            };
            // Check for duplicates (Simple mock check)
            const isDuplicate = papers.some(p =>
                p.year === newPaper.year &&
                p.college === newPaper.college &&
                p.subject === newPaper.subject &&
                p.type === newPaper.type
            );

            if (isDuplicate) {
                alert("Duplicate Warning: A paper with these exact details already exists!");
            } else {
                setPapers([...papers, newPaper]);
                alert("Paper uploaded successfully!");
            }
        } else {
            alert("Please select all filters (Year, College, Subject, Exam Type) to upload to the correct folder.");
        }
    };

    return (
        <div className="feature-container">
            {/* Filter Section */}
            <div className="filters-card grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', marginBottom: '2rem', gap: '1rem' }}>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="filter-select">
                    <option value="">Select Year</option>
                    {mockBackend.years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={college} onChange={(e) => setCollege(e.target.value)} className="filter-select">
                    <option value="">Select College</option>
                    {mockBackend.colleges.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="filter-select">
                    <option value="">Select Subject</option>
                    {mockBackend.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={examType} onChange={(e) => setExamType(e.target.value)} className="filter-select">
                    <option value="">Select Exam Type</option>
                    {mockBackend.examTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            {/* Results Grid */}
            <div className="papers-grid">
                {filteredPapers.length > 0 ? (
                    filteredPapers.map((paper) => (
                        <div key={paper.id} className="paper-card">
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <div className="paper-icon">
                                    <FileText size={48} color="#6366f1" strokeWidth={1.5} />
                                </div>
                                <h3 style={{ margin: 0 }}>{paper.subject}</h3>
                            </div>
                            <p className="meta">{paper.college}</p>
                            <p className="meta-subtitle">{paper.type}</p>
                            <div className="tags-row">
                                <span className="tag">{paper.year}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: 'auto' }}>
                                <button className="view-btn" style={{ flex: 1 }}>
                                    <Download size={18} /> VIEW
                                </button>
                                {user.role === 'teacher' && (
                                    <button className="icon-btn" style={{ background: '#f8717120', color: '#f87171', borderColor: 'transparent' }} title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    // Displayed when no papers match the current filters
                    <div className="no-results-message">
                        <FileText size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>No papers found for these filters.</p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default QuestionPapers;

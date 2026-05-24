import React, { useState } from 'react';
import { Search, MessageSquare, Image, CheckCircle, Plus, User, Clock, Camera } from 'lucide-react';
import '../features/FeatureStyles.css';

const DoubtSolving = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newDoubt, setNewDoubt] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedDoubt, setSelectedDoubt] = useState(null);
    const [attachedImage, setAttachedImage] = useState(null);

    const handleImageAttach = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachedImage(URL.createObjectURL(file));
        }
    };

    const [doubts, setDoubts] = useState([
        // Mathematics
        { id: 1, question: 'How to solve quadratic equations using the formula method?', subject: 'Mathematics', author: 'Ravi K.', time: '2 hours ago', answers: [{ author: 'Mrs. Sharma (Teacher)', text: 'Use the formula x = (-b ± √(b²-4ac)) / 2a.', time: '1 hour ago' }], resolved: true, hasImage: false },
        { id: 2, question: 'What is the difference between a permutation and a combination?', subject: 'Mathematics', author: 'Anjali M.', time: '5 hours ago', answers: [{ author: 'Rahul S.', text: 'Permutation is for ordered arrangements, combination is for unordered selections.', time: '3 hours ago' }], resolved: true, hasImage: false },
        { id: 3, question: 'Can someone explain the chain rule in calculus?', subject: 'Mathematics', author: 'Vikram S.', time: '1 day ago', answers: [], resolved: false, hasImage: false },
        { id: 4, question: 'I\'m struggling with trigonometric identities. Any tips to memorize them?', subject: 'Mathematics', author: 'Priya T.', time: '2 days ago', answers: [{ author: 'Mrs. Sharma (Teacher)', text: 'Learn the fundamental ones (sin²θ + cos²θ = 1) and derive the rest. Practice is key.', time: '1 day ago' }], resolved: false, hasImage: false },
        
        // Physics
        { id: 5, question: 'What is the difference between speed and velocity?', subject: 'Physics', author: 'Karan V.', time: '3 hours ago', answers: [{ author: 'Mr. Iyer (Teacher)', text: 'Speed is a scalar (magnitude only). Velocity is a vector (magnitude and direction).', time: '1 hour ago' }], resolved: true, hasImage: false },
        { id: 6, question: 'Can someone explain Newton\'s third law of motion with a real-life example?', subject: 'Physics', author: 'Neha L.', time: '6 hours ago', answers: [{ author: 'Aman J.', text: 'When you jump off a small boat, you push the boat backward (action), and the boat pushes you forward (reaction).', time: '4 hours ago' }], resolved: true, hasImage: false },
        { id: 7, question: 'How does a transformer work in an AC circuit?', subject: 'Physics', author: 'Rahul S.', time: '1 day ago', answers: [], resolved: false, hasImage: true },
        
        // Chemistry
        { id: 8, question: 'What is the difference between ionic and covalent bonds?', subject: 'Chemistry', author: 'Sneha R.', time: '4 hours ago', answers: [{ author: 'Ms. Gupta (Teacher)', text: 'Ionic bonds involve the transfer of electrons, while covalent bonds involve the sharing of electrons.', time: '2 hours ago' }], resolved: true, hasImage: false },
        { id: 9, question: 'How do you balance C6H12O6 + O2 -> CO2 + H2O?', subject: 'Chemistry', author: 'Arjun P.', time: '8 hours ago', answers: [{ author: 'Sneha R.', text: 'The balanced equation is C6H12O6 + 6O2 -> 6CO2 + 6H2O.', time: '5 hours ago' }], resolved: true, hasImage: false },
        { id: 10, question: 'What are the exceptions to the octet rule?', subject: 'Chemistry', author: 'Meera N.', time: '2 days ago', answers: [], resolved: false, hasImage: false },

        // Biology
        { id: 11, question: 'What is the difference between mitosis and meiosis?', subject: 'Biology', author: 'Ananya R.', time: '5 hours ago', answers: [{ author: 'Mr. Patel (Teacher)', text: 'Mitosis produces 2 identical cells. Meiosis produces 4 genetically different cells for reproduction.', time: '3 hours ago' }], resolved: true, hasImage: false },
        { id: 12, question: 'How does cellular respiration differ from photosynthesis?', subject: 'Biology', author: 'Karan V.', time: '10 hours ago', answers: [{ author: 'Ravi K.', text: 'Photosynthesis stores energy in glucose, cellular respiration releases it.', time: '6 hours ago' }], resolved: true, hasImage: false },
        { id: 13, question: 'Can someone explain the structure of DNA?', subject: 'Biology', author: 'Priya T.', time: '1 day ago', answers: [], resolved: false, hasImage: true },

        // Social Study
        { id: 14, question: 'What were the main causes of the French Revolution?', subject: 'Social Study', author: 'Rahul S.', time: '6 hours ago', answers: [{ author: 'Mrs. Verma (Teacher)', text: 'Social inequality, tax burden on the Third Estate, and the rise of Enlightenment ideas.', time: '4 hours ago' }], resolved: true, hasImage: false },
        { id: 15, question: 'Can someone explain the difference between a democracy and a republic?', subject: 'Social Study', author: 'Neha L.', time: '12 hours ago', answers: [], resolved: false, hasImage: false },
        { id: 16, question: 'What are the fundamental rights guaranteed by the Indian Constitution?', subject: 'Social Study', author: 'Arjun P.', time: '2 days ago', answers: [{ author: 'Sneha R.', text: 'Right to Equality, Freedom, against Exploitation, Freedom of Religion, Cultural/Educational rights, and Constitutional Remedies.', time: '1 day ago' }], resolved: true, hasImage: false },

        // Hindi
        { id: 17, question: 'What is the difference between Swar and Vyanjan in Hindi grammar?', subject: 'Hindi', author: 'Meera N.', time: '7 hours ago', answers: [{ author: 'Mr. Singh (Teacher)', text: 'Swar are vowels (independent sounds). Vyanjan are consonants (depend on Swar for pronunciation).', time: '5 hours ago' }], resolved: true, hasImage: false },
        { id: 18, question: 'Can someone provide a summary of the poem "Kabir ke Dohe"?', subject: 'Hindi', author: 'Vikram S.', time: '14 hours ago', answers: [], resolved: false, hasImage: false },
        { id: 19, question: 'How to correctly use Muhavare (idioms) in a sentence?', subject: 'Hindi', author: 'Anjali M.', time: '1 day ago', answers: [{ author: 'Mr. Singh (Teacher)', text: 'Understand the figurative meaning, not just the literal translation. Practice by writing sentences.', time: '12 hours ago' }], resolved: true, hasImage: false },

        // Kannada
        { id: 20, question: 'What are the rules for using Sandhi in Kannada grammar?', subject: 'Kannada', author: 'Ravi K.', time: '8 hours ago', answers: [{ author: 'Mrs. Gowda (Teacher)', text: 'Sandhi is the joining of two words. Main types are Lopa, Agama, and Aadesha sandhi.', time: '6 hours ago' }], resolved: true, hasImage: false },
        { id: 21, question: 'Can someone explain the summary of "Mankuthimmana Kagga"?', subject: 'Kannada', author: 'Sneha R.', time: '16 hours ago', answers: [], resolved: false, hasImage: false },
        { id: 22, question: 'How to differentiate between different types of Samasa?', subject: 'Kannada', author: 'Karan V.', time: '2 days ago', answers: [{ author: 'Mrs. Gowda (Teacher)', text: 'Look at which word (poorva/uttara pada) has importance in the compound word.', time: '1 day ago' }], resolved: true, hasImage: false },

        // English
        { id: 23, question: 'What is the correct use of "whom" vs "who"?', subject: 'English', author: 'Priya M.', time: '9 hours ago', answers: [{ author: 'Ms. Gupta (Teacher)', text: '"Who" is a subject pronoun. "Whom" is an object pronoun. Tip: if you can replace with "him/her", use "whom".', time: '7 hours ago' }], resolved: true, hasImage: false },
        { id: 24, question: 'Can someone explain the themes in Shakespeare\'s "Macbeth"?', subject: 'English', author: 'Arjun P.', time: '18 hours ago', answers: [], resolved: false, hasImage: false },
        { id: 25, question: 'What is the difference between active and passive voice?', subject: 'English', author: 'Neha L.', time: '2 days ago', answers: [{ author: 'Ms. Gupta (Teacher)', text: 'Active: Subject does the action (The dog bit the man). Passive: Subject receives action (The man was bitten by the dog).', time: '1 day ago' }], resolved: true, hasImage: false },

        // Extra Curricular
        { id: 26, question: 'What are the basic rules for participating in the school debate competition?', subject: 'Extra Curricular', author: 'Vikram S.', time: '10 hours ago', answers: [{ author: 'Mr. Das (Coordinator)', text: '3 minutes per speaker, 1 rebuttal allowed per team. Teams of 2.', time: '8 hours ago' }], resolved: true, hasImage: false },
        { id: 27, question: 'Can someone share tips for improving public speaking skills?', subject: 'Extra Curricular', author: 'Anjali M.', time: '20 hours ago', answers: [], resolved: false, hasImage: false },
        { id: 28, question: 'Are there any specific guidelines for the annual art exhibition submissions?', subject: 'Extra Curricular', author: 'Meera N.', time: '3 days ago', answers: [{ author: 'Mrs. Rao (Art Teacher)', text: 'Max size A3. Must be framed. Theme is "Nature". Deadline is Friday.', time: '2 days ago' }], resolved: true, hasImage: false },

        // Computer Science
        { id: 29, question: 'What is the difference between an Abstract Class and an Interface in Java?', subject: 'Computer Science', author: 'Rohan G.', time: '1 hour ago', answers: [{ author: 'Mrs. Aditi (CS Teacher)', text: 'Abstract classes can have instance variables and concrete methods. Interfaces primarily define static constants and abstract methods (multiple inheritance tool).', time: '30 min ago' }], resolved: true, hasImage: false },
        { id: 30, question: 'How does a Binary Search algorithm achieve O(log n) time complexity?', subject: 'Computer Science', author: 'Siddharth M.', time: '4 hours ago', answers: [{ author: 'Tutor Mike', text: 'By dividing the sorted search range in half on each step. It eliminates half the elements in one comparison.', time: '3 hours ago' }], resolved: true, hasImage: false },
        { id: 31, question: 'What is the difference between SQL and NoSQL databases?', subject: 'Computer Science', author: 'Sneha R.', time: '1 day ago', answers: [], resolved: false, hasImage: false },
        { id: 32, question: 'Can someone explain the purpose of recursion in programming?', subject: 'Computer Science', author: 'Vikram S.', time: '2 days ago', answers: [{ author: 'Mrs. Aditi (CS Teacher)', text: 'Recursion is when a function calls itself to solve a smaller instance of the same problem. It requires a defined base case to stop execution.', time: '1 day ago' }], resolved: true, hasImage: false }
    ]);

    const filtered = doubts.filter(d =>
        (!selectedSubject || d.subject === selectedSubject) &&
        (d.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handlePostDoubt = () => {
        if (!newDoubt.trim() && !attachedImage) return;
        setDoubts(prev => [{
            id: Date.now(), question: newDoubt, subject: selectedSubject || 'General',
            author: 'You', time: 'Just now', answers: [], resolved: false, hasImage: !!attachedImage
        }, ...prev]);
        setNewDoubt('');
        setAttachedImage(null);
        setShowForm(false);
    };

    const markResolved = (id) => {
        setDoubts(prev => prev.map(d => d.id === id ? { ...d, resolved: true } : d));
    };

    const subjectColors = {
        'Mathematics': '#3b82f6',
        'Physics': '#8b5cf6',
        'Chemistry': '#ec4899',
        'Biology': '#10b981',
        'Social Study': '#f97316',
        'Hindi': '#f59e0b',
        'Kannada': '#06b6d4',
        'English': '#f43f5e',
        'Extra Curricular': '#84cc16',
        'Computer Science': '#6366f1',
    };
    const subjects = Object.keys(subjectColors);

    if (!selectedSubject) {
        return (
            <div className="feature-container">
                <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800 }}>Select a Subject</h2>
                <div className="ds-subject-grid">
                    {subjects.map(sub => (
                        <div 
                            key={sub} 
                            className="ds-subject-box" 
                            style={{ 
                                backgroundColor: `${subjectColors[sub]}15`, 
                                border: `1px solid ${subjectColors[sub]}40` 
                            }}
                            onClick={() => setSelectedSubject(sub)}
                        >
                            <span style={{ color: subjectColors[sub] }}>{sub}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="feature-container">
            {/* Top Bar */}
            <div className="ds-top-bar">
                <button className="action-btn" onClick={() => setSelectedSubject(null)} style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '10px 16px' }}>
                    &laquo; Back
                </button>
                <div className="ds-search-wrap">
                    <Search size={18} color="#888" />
                    <input
                        type="text"
                        placeholder="Search doubts by keyword or subject..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="ds-search-input"
                    />
                </div>
                <button className="action-btn" onClick={() => setShowForm(!showForm)}>
                    <Plus size={16} /> Post a Doubt
                </button>
            </div>

            {/* New Doubt Form */}
            {showForm && (
                <div className="card ds-form-card">
                    <h3>Ask a New Doubt</h3>
                    <textarea
                        className="ds-textarea"
                        placeholder="Type your question here..."
                        value={newDoubt}
                        onChange={e => setNewDoubt(e.target.value)}
                        rows={4}
                    />
                    {attachedImage && (
                        <div className="ds-image-preview">
                            <img src={attachedImage} alt="Attached preview" />
                            <button className="ds-remove-image" onClick={() => setAttachedImage(null)}>×</button>
                        </div>
                    )}
                    <div className="ds-form-actions">
                        <label className="ds-upload-btn">
                            <Image size={16} /> Attach Image
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageAttach} />
                        </label>
                        <button className="action-btn" onClick={handlePostDoubt}>Submit Doubt</button>
                    </div>
                </div>
            )}

            {/* Doubts Feed */}
            <div className="ds-feed">
                {filtered.map(doubt => (
                    <div key={doubt.id} className={`card ds-doubt-card ${doubt.resolved ? 'resolved' : ''}`}>
                        <div className="ds-doubt-header">
                            <div className="ds-author">
                                <div className="ds-avatar"><User size={16} /></div>
                                <span className="ds-author-name">{doubt.author}</span>
                                <span className="ds-time"><Clock size={12} /> {doubt.time}</span>
                            </div>
                            <span className="ds-subject-tag" style={{ borderColor: subjectColors[doubt.subject], color: subjectColors[doubt.subject] }}>
                                {doubt.subject}
                            </span>
                        </div>

                        <p className="ds-question">{doubt.question}</p>
                        {doubt.hasImage && (
                            <div className="ds-image-placeholder">
                                <Image size={24} color="#555" />
                                <span>Image attached</span>
                            </div>
                        )}

                        {/* Answers Snippet / View Solution Button */}
                        {doubt.answers.length > 0 ? (
                            <div className="ds-view-solution" onClick={() => setSelectedDoubt(doubt)}>
                                <MessageSquare size={16} color="#FFC229" />
                                <span>View Solution ({doubt.answers.length})</span>
                            </div>
                        ) : (
                            <div className="ds-no-answers">
                                <MessageSquare size={16} color="#888" />
                                <span>No answers yet</span>
                            </div>
                        )}

                        <div className="ds-doubt-footer">
                            {doubt.resolved ? (
                                <span className="ds-resolved-badge"><CheckCircle size={14} /> Resolved</span>
                            ) : (
                                doubt.answers.length > 0 && (
                                    <button className="ds-resolve-btn" onClick={() => markResolved(doubt.id)}>
                                        <CheckCircle size={14} /> Mark as Resolved
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Solution */}
            {selectedDoubt && (
                <div className="ds-modal-overlay" onClick={() => setSelectedDoubt(null)}>
                    <div className="ds-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="ds-modal-header">
                            <h3><MessageSquare size={20} /> Solution</h3>
                            <button className="ds-close-btn" onClick={() => setSelectedDoubt(null)}>×</button>
                        </div>
                        <div className="ds-modal-question">
                            <h4>Question:</h4>
                            <p>{selectedDoubt.question}</p>
                        </div>
                        <div className="ds-modal-answers">
                            {selectedDoubt.answers.map((ans, i) => (
                                <div key={i} className="ds-answer">
                                    <div className="ds-ans-header">
                                        <MessageSquare size={14} color="#FFC229" />
                                        <strong>{ans.author}</strong>
                                        <span className="ds-time">{ans.time}</span>
                                    </div>
                                    <p>{ans.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoubtSolving;

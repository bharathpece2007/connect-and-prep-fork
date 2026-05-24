import React, { useState } from 'react';
import { Megaphone, Calendar, CheckSquare, Square, AlertCircle, PartyPopper, Info } from 'lucide-react';
import '../features/FeatureStyles.css';

const NoticeBoard = () => {
    const [signedItems, setSignedItems] = useState({});

    const toggleSign = (id) => {
        setSignedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const notices = [
        {
            id: 1, type: 'announcement', date: 'May 15, 2026',
            title: 'Annual Day Celebration',
            content: 'The Annual Day celebration will be held on May 28th, 2026 at the School Auditorium. All parents are cordially invited. Students participating in cultural programs must attend rehearsals from May 20th onwards.',
            requiresSignature: true, urgent: false
        },
        {
            id: 2, type: 'holiday', date: 'May 12, 2026',
            title: 'Summer Vacation Notice',
            content: 'School will remain closed for summer vacation from June 1st to June 30th, 2026. School reopens on July 1st. Summer homework packets will be distributed on May 25th.',
            requiresSignature: false, urgent: false
        },
        {
            id: 3, type: 'event', date: 'May 10, 2026',
            title: 'Field Trip to Science Museum',
            content: 'A field trip to the Regional Science Museum is planned for May 22nd for Classes 7-9. Permission slips must be signed and returned by May 18th. Bus fee: ₹200. Lunch will be provided.',
            requiresSignature: true, urgent: true
        },
        {
            id: 4, type: 'announcement', date: 'May 8, 2026',
            title: 'PTM Meeting - May 2026',
            content: 'Parent Teacher Meeting for all sections is scheduled for May 17th, Saturday, from 10:00 AM to 1:00 PM. Please bring the student diary. Report cards will be shared.',
            requiresSignature: false, urgent: false
        },
        {
            id: 5, type: 'event', date: 'May 5, 2026',
            title: 'Inter-School Sports Competition',
            content: 'Selected students will represent our school at the Inter-School Athletics Meet on May 24th. Practice sessions begin from May 12th. Students must carry their sports kit daily.',
            requiresSignature: true, urgent: false
        },
        {
            id: 6, type: 'announcement', date: 'May 2, 2026',
            title: 'Updated School Uniform Policy',
            content: 'Starting from the new academic session (July 2026), all students must wear the updated school uniform with the new crest. Orders can be placed at the school store before May 30th.',
            requiresSignature: true, urgent: false
        },
    ];

    const typeConfig = {
        announcement: { icon: <Megaphone size={18} />, color: '#FFC229', label: 'Announcement' },
        holiday: { icon: <PartyPopper size={18} />, color: '#4ade80', label: 'Holiday' },
        event: { icon: <Calendar size={18} />, color: '#a78bfa', label: 'Event' },
    };

    return (
        <div className="feature-container">
            <div className="nb-timeline">
                {notices.map((notice, i) => {
                    const config = typeConfig[notice.type];
                    return (
                        <div key={notice.id} className="nb-notice-item" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="nb-timeline-line">
                                <div className="nb-timeline-dot" style={{ background: config.color }} />
                                {i < notices.length - 1 && <div className="nb-timeline-connector" />}
                            </div>
                            <div className={`card nb-notice-card ${notice.urgent ? 'urgent' : ''}`}>
                                <div className="nb-notice-header">
                                    <div className="nb-type-badge" style={{ borderColor: config.color, color: config.color }}>
                                        {config.icon} {config.label}
                                    </div>
                                    <span className="nb-date">{notice.date}</span>
                                    {notice.urgent && (
                                        <span className="nb-urgent-tag">
                                            <AlertCircle size={12} /> URGENT
                                        </span>
                                    )}
                                </div>
                                <h3 className="nb-title">{notice.title}</h3>
                                <p className="nb-content">{notice.content}</p>

                                {notice.requiresSignature && (
                                    <div className="nb-signature-row" onClick={() => toggleSign(notice.id)}>
                                        {signedItems[notice.id] ?
                                            <CheckSquare size={18} color="#4ade80" /> :
                                            <Square size={18} color="#888" />
                                        }
                                        <span className={signedItems[notice.id] ? 'signed' : ''}>
                                            {signedItems[notice.id] ? 'Parent Signature Provided ✓' : 'Parent Signature Required'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NoticeBoard;

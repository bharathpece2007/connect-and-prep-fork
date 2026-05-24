import React, { useState, useEffect } from 'react';
import { Megaphone, Calendar, CheckSquare, Square, AlertCircle, PartyPopper, Info } from 'lucide-react';
import '../features/FeatureStyles.css';
import { useAuth } from '../../context/AuthContext';
import { noticeService } from '../../services/supabaseService';

const NoticeBoard = () => {
    const { user } = useAuth();
    const [signedItems, setSignedItems] = useState({});
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load notices from Supabase
        noticeService.getAll()
            .then(data => {
                if (data && data.length > 0) {
                    setNotices(data);
                } else {
                    // Fallback to static data if DB empty
                    setNotices([
                        {
                            id: 1, type: 'announcement', date: 'May 15, 2026',
                            title: 'Annual Day Celebration',
                            content: 'The Annual Day celebration will be held on May 28th, 2026 at the School Auditorium. All parents are cordially invited. Students participating in cultural programs must attend rehearsals from May 20th onwards.',
                            requires_signature: true, urgent: false
                        },
                        {
                            id: 2, type: 'holiday', date: 'May 12, 2026',
                            title: 'Summer Vacation Notice',
                            content: 'School will remain closed for summer vacation from June 1st to June 30th, 2026. School reopens on July 1st. Summer homework packets will be distributed on May 25th.',
                            requires_signature: false, urgent: false
                        },
                        {
                            id: 3, type: 'event', date: 'May 10, 2026',
                            title: 'Field Trip to Science Museum',
                            content: 'A field trip to the Regional Science Museum is planned for May 22nd for Classes 7-9. Permission slips must be signed and returned by May 18th. Bus fee: ₹200. Lunch will be provided.',
                            requires_signature: true, urgent: true
                        },
                        {
                            id: 4, type: 'announcement', date: 'May 8, 2026',
                            title: 'PTM Meeting - May 2026',
                            content: 'Parent Teacher Meeting for all sections is scheduled for May 17th, Saturday, from 10:00 AM to 1:00 PM. Please bring the student diary. Report cards will be shared.',
                            requires_signature: false, urgent: false
                        },
                        {
                            id: 5, type: 'event', date: 'May 5, 2026',
                            title: 'Inter-School Sports Competition',
                            content: 'Selected students will represent our school at the Inter-School Athletics Meet on May 24th. Practice sessions begin from May 12th. Students must carry their sports kit daily.',
                            requires_signature: true, urgent: false
                        },
                        {
                            id: 6, type: 'announcement', date: 'May 2, 2026',
                            title: 'Updated School Uniform Policy',
                            content: 'Starting from the new academic session (July 2026), all students must wear the updated school uniform with the new crest. Orders can be placed at the school store before May 30th.',
                            requires_signature: true, urgent: false
                        },
                    ]);
                }
            })
            .catch(() => {
                // Fallback stays as empty — static data still shown above
            })
            .finally(() => setLoading(false));
    }, []);

    // Load which notices this user has already signed
    useEffect(() => {
        if (!user?._id) return;
        noticeService.getSignatures(user._id)
            .then(signed => setSignedItems(signed))
            .catch(() => {});
    }, [user?._id]);

    const toggleSign = async (id) => {
        const isSigned = !!signedItems[id];
        // Optimistic update
        setSignedItems(prev => ({ ...prev, [id]: !isSigned }));
        // Persist to Supabase
        if (user?._id) {
            try {
                await noticeService.toggleSignature(user._id, id, isSigned);
            } catch {
                // Revert on failure
                setSignedItems(prev => ({ ...prev, [id]: isSigned }));
            }
        }
    };

    const typeConfig = {
        announcement: { icon: <Megaphone size={18} />, color: '#FFC229', label: 'Announcement' },
        holiday: { icon: <PartyPopper size={18} />, color: '#4ade80', label: 'Holiday' },
        event: { icon: <Calendar size={18} />, color: '#a78bfa', label: 'Event' },
    };

    if (loading) return <div className="feature-container"><p>Loading notices...</p></div>;

    return (
        <div className="feature-container">
            <div className="nb-timeline">
                {notices.map((notice, i) => {
                    const config = typeConfig[notice.type] || typeConfig.announcement;
                    // Support both old (requiresSignature) and new (requires_signature) field names
                    const requiresSig = notice.requires_signature ?? notice.requiresSignature;
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

                                {requiresSig && (
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

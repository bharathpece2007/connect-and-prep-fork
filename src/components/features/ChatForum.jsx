import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Hash, ArrowLeft } from 'lucide-react';
import { chatsAPI } from '../../services/api';
import './FeatureStyles.css';

const ChatForum = () => {
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);

    const messagesEndRef = useRef(null);

    // Fetch rooms on load
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await chatsAPI.getRooms();
                // Map mongo _id to id for seamless UI compatibility
                const mappedRooms = data.map(r => ({
                    id: r._id,
                    name: r.name,
                    subject: r.subject,
                    members: r.members,
                    lastMessage: r.lastMessage,
                    lastTime: r.lastTime
                }));
                setRooms(mappedRooms);
            } catch (err) {
                console.error('Failed to load chat channels:', err);
            } finally {
                setIsLoadingRooms(false);
            }
        };
        fetchRooms();
    }, []);

    // Fetch and poll messages for the active room
    useEffect(() => {
        if (!activeRoom) return;

        const fetchMessages = async () => {
            try {
                const data = await chatsAPI.getMessages(activeRoom.id);
                // Map fields to match UI: roomId, user, message, time, isOwn
                const currentUserName = JSON.parse(localStorage.getItem('cp_user'))?.name || 'You';
                const mappedMessages = data.map(m => ({
                    id: m._id,
                    roomId: m.roomId,
                    user: m.user,
                    message: m.message,
                    time: m.time,
                    isOwn: m.user === currentUserName || m.user === 'You'
                }));
                setMessages(mappedMessages);
            } catch (err) {
                console.error('Failed to fetch channel messages:', err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);

        return () => clearInterval(interval);
    }, [activeRoom]);

    // Auto-scroll messages to bottom when activeRoom changes or new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!newMessage.trim() || !activeRoom) return;

        const text = newMessage;
        setNewMessage('');

        const currentUserName = JSON.parse(localStorage.getItem('cp_user'))?.name || 'You';

        try {
            const savedMsg = await chatsAPI.sendMessage(activeRoom.id, text, currentUserName);
            setMessages(prev => [...prev, {
                id: savedMsg._id,
                roomId: activeRoom.id,
                user: currentUserName,
                message: text,
                time: savedMsg.time,
                isOwn: true
            }]);
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const roomMessages = messages;

    return (
        <div className="chat-container animate-enter" style={{ padding: '2rem' }}>


            <div className="chat-layout">
                {/* Room List */}
                <div className={`room-list ${activeRoom ? 'hidden-mobile' : ''}`}>
                    <h3 style={{ padding: '1rem', borderBottom: '2px solid var(--border-color)' }}>Channels</h3>
                    {isLoadingRooms ? (
                        <div style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Loading channels...</div>
                    ) : (
                        rooms.map(room => (
                            <div key={room.id} className={`room-item ${activeRoom?.id === room.id ? 'active' : ''}`}
                                onClick={() => setActiveRoom(room)}>
                                <Hash size={18} />
                                <div className="room-info">
                                    <span className="room-name">{room.name}</span>
                                    <span className="room-preview">{room.lastMessage}</span>
                                </div>
                                <div className="room-meta">
                                    <span className="room-time">{room.lastTime}</span>
                                    <span className="member-count"><Users size={12} /> {room.members}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Chat Area */}
                <div className={`chat-area ${!activeRoom ? 'empty' : ''}`}>
                    {activeRoom ? (
                        <>
                            <div className="chat-header">
                                <button className="back-btn-mobile" onClick={() => setActiveRoom(null)}>
                                    <ArrowLeft size={20} />
                                </button>
                                <Hash size={18} />
                                <h3>{activeRoom.name}</h3>
                                <span className="online-count">{activeRoom.members} members</span>
                            </div>
                            <div className="messages-area">
                                {roomMessages.map(msg => (
                                    <div key={msg.id} className={`message ${msg.isOwn ? 'own' : ''}`}>
                                        {!msg.isOwn && <div className="msg-avatar">{msg.user.charAt(0)}</div>}
                                        <div className="msg-content">
                                            {!msg.isOwn && <span className="msg-user">{msg.user}</span>}
                                            <p>{msg.message}</p>
                                            <span className="msg-time">{msg.time}</span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="chat-input-bar">
                                <input
                                    type="text"
                                    placeholder={`Message #${activeRoom.name}...`}
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                />
                                <button className="send-btn" onClick={handleSend}>
                                    <Send size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="empty-chat">
                            <Hash size={64} color="var(--text-secondary)" />
                            <h3>Select a channel to start chatting</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatForum;

import React, { useState, useEffect } from 'react';
import { chatsAPI } from '../../services/api';
import './FeatureStyles.css';

const AnonymousChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await chatsAPI.getMessages('anonymous');
                // Backend fields match: { _id, message, user }
                setMessages(data.map(m => ({
                    id: m._id,
                    text: m.message,
                    sender: m.user
                })));
            } catch (err) {
                console.error('Failed to load anonymous messages:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMessages();

        // Refresh messages every 3 seconds for simple polling real-time updates!
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const senderName = "Anonymous " + ["Fox", "Bear", "Eagle", "Shark", "Owl", "Wolf", "Panda", "Koala"][Math.floor(Math.random() * 8)];
        const text = newMessage;
        setNewMessage('');

        try {
            const savedMsg = await chatsAPI.sendMessage('anonymous', text, senderName);
            setMessages(prev => [...prev, {
                id: savedMsg._id,
                text: savedMsg.message,
                sender: savedMsg.user
            }]);
        } catch (err) {
            console.error('Failed to send anonymous message:', err);
        }
    };

    return (
        <div className="feature-container animate-enter">
            <div className="feature-header">
                <h1 className="feature-title">🕵️ Anonymous Chat</h1>
                <p className="feature-subtitle">Speak your mind without limitations.</p>
            </div>

            <div className="chat-interface card">
                <div className="chat-messages" style={{ height: '400px', overflowY: 'auto', marginBottom: '20px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{ marginBottom: '15px', borderLeft: '4px solid var(--accent-primary)', paddingLeft: '10px' }}>
                            <small style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>{msg.sender}</small>
                            <p style={{ margin: '5px 0' }}>{msg.text}</p>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type an anonymous message..."
                        style={{ flex: 1, padding: '12px', background: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'white' }}
                    />
                    <button type="submit" className="action-button" style={{ padding: '12px 24px' }}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default AnonymousChat;

import React, { useState } from 'react';
import './FeatureStyles.css';

const AnonymousChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Anyone here for the CS201 exam prep?", sender: "Anonymous Owl" },
        { id: 2, text: "Yeah, focusing on the Data Structures part today.", sender: "Anonymous Wolf" },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const msg = {
            id: Date.now(),
            text: newMessage,
            sender: "Anonymous " + ["Fox", "Bear", "Eagle", "Shark"][Math.floor(Math.random() * 4)]
        };
        setMessages([...messages, msg]);
        setNewMessage('');
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

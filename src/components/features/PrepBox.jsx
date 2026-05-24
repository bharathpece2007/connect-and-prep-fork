import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { aiAPI } from '../../services/api';
import './FeatureStyles.css';

const PrepBox = () => {
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            sender: 'ai',
            text: 'Hello there! I am **Prep Box AI**, your personal interactive AI study tutor. 🌟\n\nI can help you understand complex topics, solve homework, write study notes, or prepare for exams. \n\n*What would you like to master today?*',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (textToSend) => {
        const query = textToSend || inputText;
        if (!query.trim() || isLoading) return;

        setErrorMsg('');
        if (!textToSend) setInputText('');

        // 1. Append User Message
        const userMsg = {
            id: Date.now().toString(),
            sender: 'user',
            text: query,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // Send history excluding the welcome message
            const historyToSend = messages
                .filter(m => m.id !== 'welcome')
                .map(m => ({ sender: m.sender, text: m.text }));

            const response = await aiAPI.chat(query, historyToSend);

            // 2. Append AI Response
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: response.reply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error('Chat error:', err);
            setErrorMsg('Unable to reach Prep Box. Please ensure backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const suggestions = [
        "Explain derivatives in Calculus simply",
        "Give me a revision plan for physics exam",
        "Explain difference between Mitosis & Meiosis",
        "Translate 'Welcome to our class' in Kannada"
    ];

    // Basic markdown helper for bolding (*text*) and code formatting
    const renderMessageText = (text) => {
        if (!text) return '';
        
        // Match bold **text** or *text*
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Split by lines to generate paragraphs
        return formatted.split('\n').map((line, idx) => {
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return <li key={idx} dangerouslySetInnerHTML={{ __html: line.replace(/^[-*]\s+/, '') }} />;
            }
            if (line.trim().startsWith('1. ') || line.trim().startsWith('2. ') || line.trim().startsWith('3. ') || line.trim().startsWith('4. ')) {
                return <li key={idx} style={{ listStyleType: 'decimal' }} dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s+/, '') }} />;
            }
            return <p key={idx} style={{ margin: '4px 0' }} dangerouslySetInnerHTML={{ __html: line }} />;
        });
    };

    return (
        <div className="feature-container">
            <div className="pb-chat-container">
                {/* Chat Header */}
                <div className="pb-chat-header">
                    <div className="pb-chat-header-info">
                        <div className="pb-chat-header-icon">
                            <Bot size={22} />
                        </div>
                        <div className="pb-chat-header-title">
                            <h3>Prep Box AI</h3>
                            <span>Active Study Assistant</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#a78bfa', fontWeight: '800' }}>
                        <Sparkles size={14} /> Powered by Gemini
                    </div>
                </div>

                {/* Messages Box */}
                <div className="pb-chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`pb-message ${msg.sender}`}>
                            <div className="pb-message-avatar">
                                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className="pb-message-bubble">
                                {renderMessageText(msg.text)}
                                <span style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textAlign: 'right', marginTop: '6px' }}>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="pb-message ai">
                            <div className="pb-message-avatar">
                                <Bot size={16} />
                            </div>
                            <div className="pb-message-bubble">
                                <div className="pb-typing-indicator">
                                    <div className="pb-typing-dot"></div>
                                    <div className="pb-typing-dot"></div>
                                    <div className="pb-typing-dot"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {errorMsg && (
                        <div style={{ display: 'flex', alignSelf: 'center', alignItems: 'center', gap: '8px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', padding: '10px 16px', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem', margin: '10px 0' }}>
                            <AlertCircle size={16} />
                            {errorMsg}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions bar */}
                <div className="pb-suggestions">
                    {suggestions.map((sug, i) => (
                        <button key={i} className="pb-suggestion-btn" onClick={() => handleSend(sug)} disabled={isLoading}>
                            {sug}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <div className="pb-chat-input-area">
                    <input
                        type="text"
                        className="pb-input"
                        placeholder="Ask Prep Box AI a question..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading}
                    />
                    <button className="pb-send-btn" onClick={() => handleSend()} disabled={isLoading || !inputText.trim()}>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrepBox;

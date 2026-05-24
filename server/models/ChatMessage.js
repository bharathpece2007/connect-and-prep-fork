const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    roomId: {
        type: String, // ChatRoom ID or "anonymous"
        required: true
    },
    user: {
        type: String, // Sender name or anonymous alias
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: 'Just now'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);

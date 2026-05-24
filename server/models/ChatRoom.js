const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        default: 0
    },
    lastMessage: {
        type: String,
        default: ''
    },
    lastTime: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);

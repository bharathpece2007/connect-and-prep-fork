const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom');
const ChatMessage = require('../models/ChatMessage');
const { protect } = require('../middleware/auth');

// Seed default data helper
const seedDefaultData = async () => {
    const roomsCount = await ChatRoom.countDocuments();
    if (roomsCount === 0) {
        // Seed standard discussion rooms matching frontend mocks
        const defaultRooms = [
            { name: 'Mathematics Help', subject: 'Mathematics', members: 45, lastMessage: 'Can someone explain integration by parts?', lastTime: '2 min ago' },
            { name: 'Physics Discussion', subject: 'Physics', members: 38, lastMessage: 'Wave optics doubt - diffraction vs interference', lastTime: '15 min ago' },
            { name: 'Coding Club', subject: 'Computer Science', members: 67, lastMessage: 'DSA contest this Saturday!', lastTime: '1 hr ago' },
            { name: 'Placement Prep', subject: 'General', members: 120, lastMessage: 'Microsoft interview experience shared', lastTime: '3 hrs ago' }
        ];
        const createdRooms = await ChatRoom.insertMany(defaultRooms);

        // Seed default messages for Room 1 (Mathematics Help)
        const mathRoom = createdRooms.find(r => r.name === 'Mathematics Help');
        if (mathRoom) {
            const defaultMessages = [
                { roomId: mathRoom._id.toString(), user: 'Ananya R.', message: 'Can someone explain integration by parts?', time: '10:30 AM' },
                { roomId: mathRoom._id.toString(), user: 'Student One', message: 'Sure! Use the LIATE rule to pick u and dv.', time: '10:32 AM' },
                { roomId: mathRoom._id.toString(), user: 'Vikram S.', message: 'Also check Prof Smith notes page 45', time: '10:33 AM' },
                { roomId: mathRoom._id.toString(), user: 'Rahul K.', message: 'Thanks! That formula sheet was helpful 🙏', time: '10:35 AM' }
            ];
            await ChatMessage.insertMany(defaultMessages);
        }
    }

    // Seed default anonymous messages
    const anonMsgCount = await ChatMessage.countDocuments({ roomId: 'anonymous' });
    if (anonMsgCount === 0) {
        const defaultAnonMessages = [
            { roomId: 'anonymous', user: 'Anonymous Owl', message: 'Anyone here for the CS201 exam prep?', time: '1 hr ago' },
            { roomId: 'anonymous', user: 'Anonymous Wolf', message: 'Yeah, focusing on the Data Structures part today.', time: '45 min ago' }
        ];
        await ChatMessage.insertMany(defaultAnonMessages);
    }
};

// @route   GET /api/chats/rooms
// @desc    Get all chat discussion channels/rooms
// @access  Private
router.get('/rooms', protect, async (req, res) => {
    try {
        await seedDefaultData();
        const rooms = await ChatRoom.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/chats/messages/:roomId
// @desc    Get chat messages for a specific room (or 'anonymous')
// @access  Private
router.get('/messages/:roomId', protect, async (req, res) => {
    try {
        await seedDefaultData();
        const { roomId } = req.params;
        const messages = await ChatMessage.find({ roomId }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/chats/messages
// @desc    Post a new chat message (room or anonymous)
// @access  Private
router.post('/messages', protect, async (req, res) => {
    try {
        const { roomId, message, user } = req.body;
        
        if (!message || !roomId) {
            return res.status(400).json({ message: 'Room ID and message text are required.' });
        }

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newMessage = await ChatMessage.create({
            roomId,
            user: user || req.user.name,
            userRef: req.user.id,
            message,
            time: timeString
        });

        // Update the last message preview in ChatRoom if it's a channel room
        if (roomId !== 'anonymous') {
            await ChatRoom.findByIdAndUpdate(roomId, {
                lastMessage: message,
                lastTime: 'Just now'
            });
        }

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/papers', require('./routes/papers'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/marathons', require('./routes/marathons'));
app.use('/api/p2p', require('./routes/p2p'));
app.use('/api/library', require('./routes/library'));
app.use('/api/results', require('./routes/results'));
app.use('/api/doubts', require('./routes/doubts'));
app.use('/api/alumni', require('./routes/alumni'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Connect & Prep API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.warn(`⚠️ Local MongoDB offline or not installed (${error.message}). Running server in Offline/Demo mode...`);
    }
};

module.exports = connectDB;

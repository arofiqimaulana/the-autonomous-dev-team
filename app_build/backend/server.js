require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const mongoose = require('mongoose');
const redis = require('redis');

// Database setup
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chatdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));

const ChatSchema = new mongoose.Schema({
  sender: String,
  text: String,
  time: Date,
});
const Chat = mongoose.model('Chat', ChatSchema);

// Connect to Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  socket: {
    reconnectStrategy: false // prevent infinite reconnect loop if Redis is not running
  }
});
redisClient.on('error', (err) => {
  // Suppress long stack traces, just log once or keep it short
});
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(() => console.log('Redis is not running on this machine (skipping Redis connect)'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Mock database structures for the purpose of the prototype
const chatStore = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send historical chat data
  socket.emit('chat_history', chatStore);

  socket.on('chat_message', async (msgData) => {
    console.log('Received message:', msgData);
    const message = {
      id: Date.now().toString(),
      sender: msgData.sender,
      text: msgData.text,
      time: new Date().toISOString()
    };
    chatStore.push(message);
    io.emit('chat_message', message);
    
    try {
      if (mongoose.connection.readyState === 1) {
        const newChat = new Chat(message);
        await newChat.save();
      }
    } catch (err) {
      console.error('Failed to save to MongoDB:', err.message);
    }
  });

  socket.on('user_typing', (data) => {
    socket.broadcast.emit('user_typing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

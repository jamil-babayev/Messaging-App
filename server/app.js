const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./routes/user.routes');
const requestRoutes = require('./routes/request.routes');
const messageRoutes = require('./routes/message.routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');

const Message = require('./models/MessageModel');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// Routes:
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/messages', messageRoutes);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('client connection established');

  socket.on('join', (directId) => {
    socket.join(directId); // to join room based on direct id
  });

  socket.on('chat message', async (msg) => {
    const message = await Message.create({
      content: msg.content,
      directId: msg.directId,
      receiverId: msg.receiverId,
      senderId: msg.senderId,
      sendedAt: Date.now(),
    });

    io.to(msg.directId).emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    // If headers have already been sent, let Express handle the error
    return next(err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).send({
    message: `Error: ${err.message}`,
    status: err.status,
  });
});

module.exports = server;

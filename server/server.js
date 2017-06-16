const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '..', 'public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let newJoinerBroadcast = {
  from: "Admin",
  text: `New user has joined`,
}
let newJoiner = {
  from: "Admin",
  text: `Welcome to the chatroom`,
}

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.broadcast.emit('newMessage', generateMessage(newJoinerBroadcast.from, newJoinerBroadcast.text));

  socket.emit('newMessage', generateMessage(newJoiner.from, newJoiner.text));

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', (message, callback) => {
    formattedMessage = generateMessage(message.from, message.text)
    console.log('createMessage', formattedMessage);
    io.emit('newMessage', formattedMessage);
    callback('data from server');
  });
});


app.use(express.static(publicPath));

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
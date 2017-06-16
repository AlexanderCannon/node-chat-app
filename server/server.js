const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

let newJoinerBroadcast = {
  from: "Admin",
  text: `New user has joined`,
  createdAt: new Date()
}
let newJoiner = {
  from: "Admin",
  text: `Welcome to the chatroom`,
  createdAt: new Date()
}

io.on('connection', (socket) => {
  socket.broadcast.emit('newMessage', newJoinerBroadcast);
  socket.emit('newMessage', newJoiner);
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', (message) => {
    socket.broadcast.emit('newMessage', message);
  });
});


app.use(express.static(publicPath));

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
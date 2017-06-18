const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validator');
const { Room } = require('./classes/room');
const publicPath = path.join(__dirname, '..', 'public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

var room = new Room();
const admin = "Admin"
const newJoinerBroadcast = 'has joined the room.';
const newJoinerMessage = 'Welcome to the chatroom.';
const userLeave = 'has left the chatroom.';

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    room.removeUser(socket.id);
    room.addUser(socket.id, params.name, params.room);
    socket.join(params.room);
    io.to(params.room).emit('updateUserList', room.getUsers(params.room));
    socket.emit('newMessage', generateMessage(admin, newJoinerMessage));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage(admin, `${params.name} ${newJoinerBroadcast}`));
    callback();
  });

  socket.on('disconnect', () => {
    var user = room.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', room.getUsers(user.room))
      io.to(user.room).emit('newMessage', generateMessage(admin, `${user.name} ${userLeave}`))
    }
  });

  socket.on('createMessage', (message, callback) => {
    user = room.getUser(socket.id);
    if (user && isRealString(message)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message));
    }
    callback();
  });
  socket.on('createLocationMessage', (coords) => {
    let user = room.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });
});


app.use(express.static(publicPath));

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validator');
const publicPath = path.join(__dirname, '..', 'public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let newJoinerBroadcast = {
  from: "Admin",
  text: 'has joined the room',
}
let newJoiner = {
  from: "Admin",
  text: `Welcome to the chatroom`,
}

io.on('connection', (socket) => {


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    socket.join(params.room);
    socket.emit('newMessage', generateMessage(newJoiner.from, newJoiner.text));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage(newJoinerBroadcast.from, `${params.name} ${newJoinerBroadcast.text}`));
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('createMessage', (message, callback) => {
    formattedMessage = generateMessage(message.from, message.text)
    console.log('createMessage', formattedMessage);
    io.emit('newMessage', formattedMessage);
    callback('data from server');
  });
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
});


app.use(express.static(publicPath));

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
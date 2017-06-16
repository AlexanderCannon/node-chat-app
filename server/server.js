const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

let message = {
  from: "Alexander",
  text: "Running late, PM me",
  createdAt: new Date()
}

io.on('connection', (socket) => {
  console.log('new user connected')
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.emit('newMessage', message);

  socket.on('createMessage', (message) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      time: new Date()
    })
  });
});


app.use(express.static(publicPath));

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
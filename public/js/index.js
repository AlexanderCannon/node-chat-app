var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Location</a>');
  a.attr('href', message.url)
  li.text(`${message.from}: `);
  jQuery('#messages').append(li);
  li.append(a);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation isn\'t supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Please allow the browser to access your location.'); s
  });
});
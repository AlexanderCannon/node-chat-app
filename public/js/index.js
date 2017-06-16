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

var chatbar = jQuery('[name=message]');
var locationButton = jQuery('#send-location');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: chatbar.val()
  }, function () {
    chatbar.val('');
  });
});

locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation isn\'t supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Please allow the browser to access your location.');
  });
});
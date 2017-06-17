var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  message.formattedTime = moment(message.createdAt).format('HH:mm');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, { message });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  message.formattedTime = moment(message.createdAt).format('HH:mm');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, { message });
  jQuery('#messages').append(html);
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
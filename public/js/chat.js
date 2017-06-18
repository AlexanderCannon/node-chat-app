function scrollToBottom() {
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight'),
    scrollTop = messages.prop('scrollTop'),
    scrollHeight = messages.prop('scrollHeight'),
    newMessageHeight = newMessage.innerHeight(),
    lastMessageHeight = newMessage.prev().innerHeight();
  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

var socket = io();

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, checkValues)
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
  console.log(users);
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
    jQuery('#users').html(ol);
  });
});

socket.on('newMessage', function (message) {
  message.formattedTime = moment(message.createdAt).format('HH:mm');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, { message });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  message.formattedTime = moment(message.createdAt).format('HH:mm');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, { message });
  jQuery('#messages').append(html);
  scrollToBottom();
});

var chatbar = jQuery('[name=message]');
var locationButton = jQuery('#send-location');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', chatbar.val()
    , function () {
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

function checkValues(err) {
  if (err) {
    alert(err);
    window.location.href = '/';
  } else {
    console.log('no err')
  }
}
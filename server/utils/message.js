const moment = require('moment');
const googleUrl = 'https://www.google.com/maps/?q='

var generateMessage = (from, text) => {
  createdAt = moment().valueOf();
  return { from, text, createdAt }
}
var generateLocationMessage = (from, lat, lng) => {
  let url = `${googleUrl}${lat},${lng}`,
    createdAt = moment().valueOf();
  return { from, url, createdAt }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}

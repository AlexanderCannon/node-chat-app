const googleUrl = 'https://www.google.com/maps/?q='

var generateMessage = (from, text) => {
  createdAt = new Date().getTime();
  return { from, text, createdAt }
}
var generateLocationMessage = (from, lat, lng) => {
  let url = `${googleUrl}${lat},${lng}`,
    createdAt = new Date().getTime();
    console.log(url)
  return { from, url, createdAt }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}

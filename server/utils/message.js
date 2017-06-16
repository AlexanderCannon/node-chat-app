var generateMessage = (from, text) => {
  createdAt = new Date().getTime()
  return { from, text, createdAt }
}

module.exports =  {
  generateMessage
}
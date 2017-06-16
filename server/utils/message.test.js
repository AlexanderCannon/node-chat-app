var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('it should generate a message', () => {
  let mockMessage = { text: "mock", from: "jester" }
  it('should generate the correct message object', () => {
    var message = generateMessage(mockMessage.from, mockMessage.text);
    expect(message).toInclude(mockMessage);
    expect(message.createdAt).toNotBe(undefined).toBeA('number')
  });
});
describe('it should generate a location message', () => {
  let mockLocation = { from: "Jester", lat: 52, lng: 0 },
  mockUrl = 'https://www.google.com/maps/?q='
  it('should generate the correct message object', () => {
    var message = generateLocationMessage(mockLocation.from, mockLocation.lat, mockLocation.lng);
    expect(message.from).toBe(mockLocation.from);
    expect(message.url).toNotBe(undefined).toEqual(`${mockUrl}${mockLocation.lat},${mockLocation.lng}`)
    // expect(message.createdAt).toNotBe(undefined).toBeA('number');
  });
});
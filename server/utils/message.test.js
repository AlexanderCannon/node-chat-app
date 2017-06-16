var expect = require('expect');
var { generateMessage } = require('./message');

describe('it should generatea message', () => {
  mockMessage = { text: "mock", from: "jester" }
  it('should generate the correct message object', () => {
    var message = generateMessage(mockMessage.from, mockMessage.text);
    expect(message).toInclude(mockMessage);
    expect(message.createdAt).toNotBe(undefined).toBeA('number')
  });
});
const expect = require('expect');
const { isRealString } = require('./validator');

describe('isRealString', () => {
  let notAString= 19292,
  emptystring = '     \n ',
  realString =  '    John Boie!ezx010   \n'
  it('should reject non string values', () => {
    var n = isRealString(notAString);
    expect(n).toBe(false);
  });
  it('should reject string with only spaces', ()=>{
    var e = isRealString(emptystring);
    expect(e).toBe(false);
  });
  it('should allow strings with non space characters', ()=>{
    var v = isRealString(realString);
    expect(v).toBe(true);
  });
});
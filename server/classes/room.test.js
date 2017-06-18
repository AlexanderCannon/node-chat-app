const expect = require('expect');
const { Room } = require('./room');

describe('Room', () => {
  var room;

  beforeEach(() => {
    room = new Room();
    room.users = [
      { id: '1', name: "User 1", room: 'test room' },
      { id: '2', name: "User 2", room: 'test room 2' },
      { id: '3', name: "User 3", room: 'test room' }
    ]
  });
  roomA = new Room(),
    user = { id: '123', name: "Jester", room: 'test' }
  it('should add a new user', () => {
    var resUser = roomA.addUser(user.id, user.name, user.room);
    expect(roomA.users).toEqual([user]);
  });
  it('should retun the user names form test room', () => {
    var userList = room.getUsers('test room')
    expect(userList).toEqual(['User 1', 'User 3']);
  });
  it('should retun the user names for test room 2', () => {
    var userList = room.getUsers('test room 2')
    expect(userList).toEqual(['User 2']);
  });
  it('should remove a user', () => {
    var userId = 1;
    var resUser = room.removeUser(userId);
    expect(resUser.id).toEqual(userId);
    expect(room.users.length).toBe(2);
  });
  it('should not remove a user', () => {
    var userId = 4;
    var resUser = room.removeUser(userId);
    expect(resUser).toNotExist();
    expect(room.users.length).toBe(3);
  });
  it('should find a user', () => {
    var userId = 1
    var resUser = room.getUser(userId);
    expect(resUser.id).toEqual(userId);
  });
  it('should not a find user', () => {
    var userId = 4
    var resUser = room.getUser(userId);
    expect(resUser).toNotExist();
  });
});
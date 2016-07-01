'use strict';

class ChatRooms {
  constructor(ioc) {
    this.rooms = new Map();
  }

  add(nickname, name) {
    let room = this.getOrCreateRoom(name);
    room.nicknames.add(nickname);
  }

  remove(nickname, name) {
    let room = this.rooms.get(name);
    if (!room) return;

    room.nicknames.delete(nickname);

    if (room.nicknames.size < 1)
      this.rooms.delete(name);
  }

  getOrCreateRoom(name) {
    let room = this.rooms.get(name);
    if (room) return room;

    room = { nicknames: new Set() };
    this.rooms.set(name, room);
    return room;
  }
}

module.exports = ChatRooms;

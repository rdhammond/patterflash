'use strict';

class ChatRoomsService {
  constructor() {
    this.rooms = new Map();
  }

  get() {
    return Array.from(this.rooms.keys());
  }

  add(nickname, name) {
    let room = this.getOrCreate(name);

    room.nicknames.add(nickname);
    return room.nicknames.size === 1;
  }

  remove(nickname, name) {
    let room = this.rooms.get(name);
    if (!room) return;

    room.nicknames.delete(nickname);

    if (room.nicknames.size < 1) {
      this.rooms.delete(name);
      return true;
    }

    return false;
  }

  getOrCreate(name) {
    let room = this.rooms.get(name);
    if (room) return room;

    room = { nicknames: new Set() };
    this.rooms.set(name, room);
    return room;
  }
}

module.exports = ChatRoomsService;

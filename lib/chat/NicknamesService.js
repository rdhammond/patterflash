'use strict';

class NicknamesService {
  constructor() {
    this.nicknames = new Set();
  }

  add(nickname) {
    if (this.nicknames.has(nickname))
      return false;

    this.nicknames.add(nickname);
  }

  remove(nickname) {
    this.nicknames.delete(nickname);
  }
}

module.exports = NicknamesService;

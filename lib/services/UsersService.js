'use strict';

class UsersService {
  constructor(ioc) {
    this.nicknames = new Set();
    this.users = new ioc.UserRepository(ioc);
  }

  login(email, password, nickname) {
    return this.users.findOrCreate(email, password).then((user) => {
      if (!user.passwordMatches(password))
        throw new Error('Invalid email or password.');

      if (this.nicknames.has(nickname))
        throw new Error('Nickname is already in use. Please choose another.');

      this.nicknames.add(nickname);
    });
  }

  logout(nickname) {
    this.nicknames.delete(nickname);
  }
}

module.exports = UsersService;

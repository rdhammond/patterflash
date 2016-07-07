'use strict';

class UsersService {
  constructor(ioc) {
    this.q = ioc.q;
    this.nicknames = new Set();
    this.emails = new Set();
    this.users = new ioc.UserRepository(ioc);
  }

  login(email, password, nickname) {
    if (this.emails.has(email))
      return this.rejectWithError('You are already logged in. Multiple logins are not supported.');

    if (this.nicknames.has(nickname))
      return this.rejectWithError('Nickname is already in use. Please choose another.');

    return this.users.findOrCreate(email, password).then((user) => {
      if (!user.passwordMatches(password))
        throw new Error('Invalid email or password.');

      this.nicknames.add(nickname);
      this.emails.add(email);
    });
  }

  rejectWithError(message) {
    let deferred = this.q.defer();
    deferred.reject(new Error(message));
    return deferred.promise;
  }

  logout(email, nickname) {
    this.emails.delete(email);
    this.nicknames.delete(nickname);
  }

}

module.exports = UsersService;

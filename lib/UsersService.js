'use strict';

class UsersService {
  constructor(ioc) {
    this.q = ioc.q;
    this.nicknames = new Set();
    this.emails = new Set();
    this.users = new ioc.UserRepository(ioc);
    this.uuid = ioc.uuid;
    this.email = ioc.emailService;
  }

  login(email, password, nickname) {
    if (this.emails.has(email))
      return this.rejectWithError('You are already logged in. Multiple logins are not supported.');

    if (this.nicknames.has(nickname))
      return this.rejectWithError('Nickname is already in use. Please choose another.');

    return this.users.findOrCreate(email, password).then((user) => {
      if (!user.passwordMatches(password))
        throw new Error('Invalid email or password.');

      if (!user.isConfirmed)
        return this.sendConfirmationEmail(user);

      this.nicknames.add(nickname);
      this.emails.add(email);
      return user;
    });
  }

  sendConfirmationEmail(user) {
    return this.email
      .sendConfirmationEmail(user.email, user.confirmationToken)
      .then(() => {
        throw new Error('A confirmation link has been sent. Please \
          check your email.');
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

  confirmEmail(token) {
    return this.users.confirmEmail(token).then((success) => {
      if (!success)
        throw new Error('No such token exists.');
    });
  }
}

module.exports = UsersService;

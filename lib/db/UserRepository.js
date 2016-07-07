'use strict';

class UserRepository {
  constructor(ioc) {
    this.Model = ioc.UserModel;
    this.q = ioc.q;
    this.uuid = ioc.uuid;
  }

  findOrCreate(email, password) {
    let deferred = this.q.defer();

    this.Model.findOrCreate(
      { email },
      {
        passwordHash: this.Model.hashPassword(password),
        isConfirmed: false,
        confirmationToken: this.uuid.v4()
      },
      (err, user) => {
        if (err) return deferred.reject(err);
        deferred.resolve(user);
      }
    );

    return deferred.promise;
  }
}

module.exports = UserRepository;

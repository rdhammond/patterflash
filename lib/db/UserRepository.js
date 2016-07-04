'use strict';

class UserRepository {
  constructor(ioc) {
    this.Model = ioc.UserModel;
    this.q = ioc.q;
    this.LoginError = ioc.LoginError;
  }

  findOrCreate(email, password) {
    let passwordHash = this.Model.hashPassword(password),
      deferred = this.q.defer();

    this.Model.findOrCreate({ email }, { passwordHash }, (err, user, created) => {
      // ** TODO: Validate email
      if (err)
        return deferred.reject(err);

      if (!user)
        return deferred.reject(new this.LoginError());

      deferred.resolve(user);
    });

    return deferred.promise;
  }
}

module.exports = UserRepository;

'use strict';

class UserRepository {
  constructor(ioc) {
    this.Model = ioc.UserModel;
    this.q = ioc.q;
    this.LoginError = ioc.LoginError;
  }

  getByUsername(username) {
    let deferred = this.q.defer();

    this.Model.findOne({ username }, (err, user) => {
      if (err)
        return deferred.reject(err);

      if (!user)
        return deferred.reject(new this.LoginError());

      deferred.resolve(user);
    });

    return deferred.promise;
  }

  create(username, password) {
    let entity = new this.Model({ username });
    entity.setPassword(password);

    let deferred = this.q.defer();

    entity.save((err) => {
      if (err)
        throw err;

      deferred.resolve(entity);
    });

    return deferred.promise;
  }
}

module.exports = UserRepository;

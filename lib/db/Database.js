'use strict';

class Database {
  constructor(ioc) {
    this.q = ioc.q;
    this.mongoose = ioc.mongoose;
  }

  start(connectionString) {
    let deferred = this.q.defer();

    let connection = this.mongoose.connect(connectionString, () => {
      deferred.resolve();
    });

    return deferred.promise;
  }
}

module.exports = Database;

'use strict';

module.exports = (ioc) => {
  let schema = ioc.mongoose.Schema({
    username: {type: String, required: true, index: true},
    passwordHash: {type: String, required: true}
  });

  // DON'T use fat arrow here, we want to redefine "this"
  schema.methods.setPassword = function(password) {
    this.passwordHash = hashPassword(password);
  };

  schema.methods.passwordMatches = function(password) {
    return this.passwordHash === hashPassword(password);
  }

  return ioc.mongoose.model('User', schema);

  function hashPassword(password) {
    return ioc.crypto.createHash('sha512')
      .update(password + ioc.config.mongo.salt)
      .digest('hex');
  }
}

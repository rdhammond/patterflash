'use strict';

module.exports = (ioc) => {
  let schema = ioc.mongoose.Schema({
    email: {
      type: String,
      required: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      index: true
    },
    passwordHash: {type: String, required: true},
    isConfirmed: {type: Boolean, required: true},
    confirmationToken: {
      type: 'String',
      required: 'true',
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      index: true
    }
  });

  schema.plugin(ioc.FindOrCreate);

  // DON'T use fat arrow here, we want to redefine "this"
  schema.statics.hashPassword = function(password) {
    return hashPassword(password);
  }

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

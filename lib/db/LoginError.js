'use strict';

const MESSAGE = 'Could not log in.';

class LoginError extends Error {
  constructor() {
    super(MESSAGE);
    this.name = this.constructor.name;
    this.message = MESSAGE;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = LoginError;

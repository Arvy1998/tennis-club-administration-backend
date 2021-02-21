/**
 * @class PasswordsMissmatch
 * Error class for two passwords missmatching.
 * @extends Error
 */
class PasswordsMissmatch extends Error {
  constructor() {
    super('Passwords does not match...');
  }
}

export default PasswordsMissmatch;

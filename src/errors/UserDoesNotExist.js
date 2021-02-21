/**
 * @class UserDoesNotExist
 * Error for non-existing user trying to log-in.
 * @extends Error
 */
class UserDoesNotExist extends Error {
  constructor() {
    super('User does not exist...');
  }
}

export default UserDoesNotExist;

/**
 * @class UserNotAdmin
 * Error class for non admin user trying to use administrator operation.
 * @extends Error
 */
class UserNotAdmin extends Error {
  constructor() {
    super('User does not have administrative rights...');
  }
}

export default UserNotAdmin;

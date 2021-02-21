class UserNotAuthorized extends Error {
  constructor() {
    super('User could not be authorized...');
  }
}

export default UserNotAuthorized;

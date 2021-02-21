class DuplicateUser extends Error {
  constructor() {
    super('User is already registered...');
  }
}

export default DuplicateUser;

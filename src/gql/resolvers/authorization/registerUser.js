import DuplicateUser from 'errors/DuplicateUser';

import User from 'models/User';

import bcrypt from 'bcrypt';

import signToken from 'utils/signToken';

const registerUser = async (parent, args) => {
  const existingUser = await User.findOne({ email: args.userInput.email });
  if (existingUser) {
    throw new DuplicateUser();
  }

  /* encrypt password before saving it to the mongo database */
  const passwordHash = await bcrypt.hash(args.userInput.password, 10);
  const userToRegister = args.userInput;
  userToRegister.password = passwordHash;

  const newUser = await User.create(userToRegister);
  const token = await signToken(newUser);

  const user = newUser;
  delete user.password;

  return {
    token,
    ...user.toObject(),
  };
};

export default registerUser;

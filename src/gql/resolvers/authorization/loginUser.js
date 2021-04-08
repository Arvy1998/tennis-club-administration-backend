import UserDoesNotExist from 'errors/UserDoesNotExist';
import PasswordsMissmatch from 'errors/PasswordsMissmatch';

import User from 'models/User';

import bcrypt from 'bcrypt';

import signToken from 'utils/signToken';

const loginUser = async (parent, args) => {
  const userWithHash = await User.findOne({ email: args.userInput.email });
  if (!userWithHash) {
    throw new UserDoesNotExist();
  }

  const match = new Promise((resolve, reject) => {
    bcrypt.compare(args.userInput.password, userWithHash.password, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

  if (!(await match)) {
    throw new PasswordsMissmatch();
  }

  const token = await signToken(userWithHash);

  const user = userWithHash;
  delete user.password;

  return {
    token,
    ...user.toObject(),
  };
};

export default loginUser;

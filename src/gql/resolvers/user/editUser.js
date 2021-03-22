import UserNotAuthorized from 'errors/UserNotAuthorized';
import UserDoesNotExist from 'errors/UserDoesNotExist';
import PasswordsMissmatch from 'errors/PasswordsMissmatch';

import User from 'models/User';

import bcrypt from 'bcrypt';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const editUser = async (parent, args, { user }) => {
  let userToEdit = args.userInput;
  const userForAuthorization = await User.findOne({ email: args.email });

  /* only allow editing user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const userWithHash = await User.findOne({ email: args.userInput.email });
  if (!userWithHash) {
    throw new UserDoesNotExist();
  }

  /* mongoDB can update fields when null or undefined passed */
  const genderOption = userToEdit.sex;
  const levelOption = userToEdit.level;

  userToEdit = filterNotDefinedFields(userToEdit);

  if (userToEdit.newPassword && userToEdit.password) {
    const match = new Promise((resolve, reject) => {
      bcrypt.compare(args.userInput.password, userWithHash.password, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });

    if (!(await match)) {
      throw new PasswordsMissmatch();
    }

    const passwordHash = await bcrypt.hash(userToEdit.newPassword, 10);
    userToEdit.password = passwordHash;

    if (userToEdit.newEmail) {
      userToEdit.email = userToEdit.newEmail;
    }
  }

  const editedUser = await User.findOneAndUpdate(
    { email: args.email },
    {
      ...userToEdit,
      sex: genderOption,
      level: levelOption,
    },
    { new: true },
  );

  return editedUser;
};

export default editUser;

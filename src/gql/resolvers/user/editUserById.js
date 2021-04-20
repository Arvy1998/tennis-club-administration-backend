import UserNotAuthorized from 'errors/UserNotAuthorized';

import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const editUserById = async (parent, args, { user }) => {
  let userToEdit = args.userInput;
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow editing user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  if (user.role !== 'ADMIN') {
    throw new UserNotAuthorized();
  }

  userToEdit = filterNotDefinedFields(userToEdit);

  const editedUser = await User.findOneAndUpdate(
    { _id: args.id },
    userToEdit,
    { new: true },
  );

  return editedUser;
};

export default editUserById;

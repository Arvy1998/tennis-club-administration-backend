import UserNotAuthorized from 'errors/UserNotAuthorized';

import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const editUser = async (parent, args, { user }) => {
  let userToEdit = args.userInput;
  const userForAuthorization = await User.findOne({ email: args.email });

  /* only allow editing user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  /* mongoDB can update fields when null or undefined passed */
  userToEdit = filterNotDefinedFields(userToEdit);

  const editedUser = await User.findOneAndUpdate(
    { email: args.email },
    userToEdit,
    { new: true },
  );

  return editedUser;
};

export default editUser;

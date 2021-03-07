import UserNotAuthorized from 'errors/UserNotAuthorized';

import User from 'models/User';

const deleteUser = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: args.email });

  /* only allow deactivating user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const deletedUser = await User.findOneAndDelete({
    email: args.email,
  });

  return deletedUser;
};

export default deleteUser;

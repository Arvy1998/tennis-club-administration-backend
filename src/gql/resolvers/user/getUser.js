import UserNotAuthorized from 'errors/UserNotAuthorized';

import User from 'models/User';

const getUser = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: args.email });

  /* only allow viewing user's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const userToReturn = await User.findOne({ email: args.email });
  return userToReturn;
};

export default getUser;

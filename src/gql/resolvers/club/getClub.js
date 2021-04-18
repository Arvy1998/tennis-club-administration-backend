import UserNotAuthorized from 'errors/UserNotAuthorized';

import Club from 'models/Club';
import User from 'models/User';

const getClub = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow viewing user's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const clubToReturn = await Club.findOne({ _id: args.id });
  return clubToReturn;
};

export default getClub;
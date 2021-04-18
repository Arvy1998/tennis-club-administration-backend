import UserNotAuthorized from 'errors/UserNotAuthorized';

import Club from 'models/Club';
import User from 'models/User';

const getClubByCreatorId = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow viewing clubs's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const clubToReturn = await Club.findOne({ creatorId: args.creatorId });
  return clubToReturn;
};

export default getClubByCreatorId;
import UserNotAuthorized from 'errors/UserNotAuthorized';

import Club from 'models/Club';
import User from 'models/User';

const listClubs = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow viewing club's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const clubsToReturn = await Club.find();
  return clubsToReturn;
};

export default listClubs;

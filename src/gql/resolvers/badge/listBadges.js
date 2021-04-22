import UserNotAuthorized from 'errors/UserNotAuthorized';

import Badge from 'models/Badge';
import User from 'models/User';

const listBadges = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow viewing badge's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const badgesToReturn = await Badge.find();
  return badgesToReturn;
};

export default listBadges;

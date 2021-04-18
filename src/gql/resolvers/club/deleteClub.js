import UserNotAuthorized from 'errors/UserNotAuthorized';

import Club from 'models/Club';
import User from 'models/User';

const deleteClub = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow deactivating user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const deletedClub = await Club.findOneAndDelete({
    _id: args.id,
  });

  return deletedClub;
};

export default deleteClub;

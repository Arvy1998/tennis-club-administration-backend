import UserNotAuthorized from 'errors/UserNotAuthorized';

import PlayField from 'models/PlayField';
import User from 'models/User';

const deleteUser = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: args.email });

  /* only allow deactivating user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const deletedPlayField = await PlayField.findOneAndDelete({
    id: args.id,
  });

  return deletedPlayField;
};

export default deleteUser;

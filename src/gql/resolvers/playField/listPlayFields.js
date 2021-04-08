import UserNotAuthorized from 'errors/UserNotAuthorized';

import PlayField from 'models/PlayField';
import User from 'models/User';

const listPlayFields = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: args.email });

  /* only allow viewing user's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  let playFieldsToReturn = [];

  if (args.playFieldQueryInput) {
    playFieldsToReturn = await PlayField.find(args.playFieldQueryInput);
  } else {
    playFieldsToReturn = await PlayField.find();
  }

  return playFieldsToReturn;
};

export default listPlayFields;

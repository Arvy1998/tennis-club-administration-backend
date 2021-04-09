import UserNotAuthorized from 'errors/UserNotAuthorized';

import PlayField from 'models/PlayField';
import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const createPlayField = async (parent, args, { user }) => {
  const playFieldToEdit = args.playFieldInput;
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow editing user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const newPlayField = await PlayField.create(filterNotDefinedFields(playFieldToEdit));
  return newPlayField;
};

export default createPlayField;

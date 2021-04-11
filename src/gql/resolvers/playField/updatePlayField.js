import UserNotAuthorized from 'errors/UserNotAuthorized';

import PlayField from 'models/PlayField';
import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const updatePlayField = async (parent, args, { user }) => {
  const playFieldToEdit = args.playFieldInput;
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow editing user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const updatedPlayField = await PlayField.findOneAndUpdate(
    { _id: args.id },
    filterNotDefinedFields(playFieldToEdit),
    { new: true },
  );

  return updatedPlayField;
};

export default updatePlayField;

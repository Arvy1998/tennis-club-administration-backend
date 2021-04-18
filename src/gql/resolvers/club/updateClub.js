import UserNotAuthorized from 'errors/UserNotAuthorized';

import Club from 'models/Club';
import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const updateClub = async (parent, args, { user }) => {
  const clubToEdit = args.clubInput;
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow editing user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const updatedClub = await Club.findOneAndUpdate(
    { _id: args.id },
    filterNotDefinedFields(clubToEdit),
    { new: true },
  );

  return updatedClub;
};

export default updateClub;

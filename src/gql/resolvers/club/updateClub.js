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

  updatedClub.userIds.map(async (userId) => {
    const userToCheck = await User.findById(userId);
    /* check if user has made into club */
    if (!userToCheck.badgeIds.includes('6081b057093f9e1848684a8d')) {
      await User.findOneAndUpdate(
        { _id: userId },
        { badgeIds: [...userToCheck.badgeIds, '6081b057093f9e1848684a8d'] },
        { new: true },
      );
    }
  })

  return updatedClub;
};

export default updateClub;

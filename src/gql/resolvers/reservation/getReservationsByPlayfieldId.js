import UserNotAuthorized from 'errors/UserNotAuthorized';

import Reservation from 'models/Reservation';
import User from 'models/User';

const getReservationsByPlayfieldId = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow viewing reservations's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const greservationsToReturn = await Reservation.find({
       playFieldId: args.playFieldId,
  });
  return greservationsToReturn;
};

export default getReservationsByPlayfieldId;

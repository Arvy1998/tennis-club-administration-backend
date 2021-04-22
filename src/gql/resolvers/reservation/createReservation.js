import UserNotAuthorized from 'errors/UserNotAuthorized';

import Reservation from 'models/Reservation';
import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const createReservation = async (parent, args, { user }) => {
  let reservationToEdit = args.reservationInput;
  const userForAuthorization = await User.findOne({ email: user.email });

  reservationToEdit.paid = false;
  reservationToEdit.createdAt = new Date();

  /* only allow editing user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const newReservation = await Reservation.create(
    {
      ...filterNotDefinedFields(reservationToEdit),
      paid: false,
      status: 'Active',
    }
  );

  /* check if this is first reservation for the user, add reservation badge ID */
  if (!userForAuthorization.badgeIds.includes('6081b057093f9e1848684a91')) {
    await User.findOneAndUpdate(
      { email: user.email },
      { badgeIds: [...userForAuthorization.badgeIds, '6081b057093f9e1848684a91'] },
      { new: true },
    );
  }

  return newReservation;
};

export default createReservation;

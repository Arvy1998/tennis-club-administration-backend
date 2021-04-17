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
  return newReservation;
};

export default createReservation;

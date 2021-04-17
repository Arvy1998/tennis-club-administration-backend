import UserNotAuthorized from 'errors/UserNotAuthorized';

import Reservation from 'models/Reservation';
import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const updateReservation = async (parent, args, { user }) => {
  const reservationToEdit = args.reservationInput;
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow editing user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const updatedReservation = await Reservation.findOneAndUpdate(
    { _id: args.id },
    {
        ...filterNotDefinedFields(reservationToEdit),
        paid: reservationToEdit.paid,
    },
    { new: true },
  );

  return updatedReservation;
};

export default updateReservation;

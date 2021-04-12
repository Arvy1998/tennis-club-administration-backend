import UserNotAuthorized from 'errors/UserNotAuthorized';

import Game from 'models/Game';
import User from 'models/User';

const deleteGame = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow deactivating user if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const deletedGame = await Game.findOneAndDelete({
    _id: args.id,
  });

  return deletedGame;
};

export default deleteGame;

import UserNotAuthorized from 'errors/UserNotAuthorized';

import Game from 'models/Game';
import User from 'models/User';

const getGame = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow viewing user's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const gameToReturn = await Game.findOne({ _id: args.id });
  return gameToReturn;
};

export default getGame;

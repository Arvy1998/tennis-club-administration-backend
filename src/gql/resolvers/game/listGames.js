import UserNotAuthorized from 'errors/UserNotAuthorized';

import Game from 'models/Game';
import User from 'models/User';

const listGames = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow viewing game's information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const gamesToReturn = await Game.find();
  return gamesToReturn;
};

export default listGames;

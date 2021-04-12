import UserNotAuthorized from 'errors/UserNotAuthorized';

import Game from 'models/Game';
import User from 'models/User';
import _ from 'lodash';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const updateGame = async (parent, args, { user }) => {
    let gameToEdit = args.gameInput;
    const userForAuthorization = await User.findOne({ email: user.email });

    /* only allow creating game if it's not another user */
    if (user.userId !== userForAuthorization._id.toString()) {
        throw new UserNotAuthorized();
    }

    const updatedGame = await Game.findOneAndUpdate(
        { _id: args.id },
        filterNotDefinedFields(gameToEdit),
        { new: true },
    );
    return updatedGame;
};

export default updateGame;
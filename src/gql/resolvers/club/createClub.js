import UserNotAuthorized from 'errors/UserNotAuthorized';

import User from 'models/User';
import Club from 'models/Club';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const createClub = async (parent, args, { user }) => {
    let clubToEdit = args.clubInput;
    const userForAuthorization = await User.findOne({ email: user.email });

    /* only allow editing user if it's not another user */
    if (user.userId !== userForAuthorization._id.toString()) {
        throw new UserNotAuthorized();
    }

    clubToEdit.creatorId = user.userId;

    const newClub = await Club.create(filterNotDefinedFields(clubToEdit));

    /* assign new club for trenner for auth purposes */
    if (userForAuthorization.role === 'TRENNER') {
        await User.findOneAndUpdate(
            { email: user.email },
            { clubId: newClub._id },
            { new: true },
        );
    }

    return newClub;
};

export default createClub;
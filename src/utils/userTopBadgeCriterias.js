import _ from 'lodash';

import User from 'models/User';

const userTopBadgeCriterias = async (users, currentUser) => {
    let currId = currentUser.userId;

    const userToCheck = await User.findById(currId);

    users = _.orderBy(users, 'rating', 'desc');
    users = users.filter(user => user.rating > 0);
    users = users.slice(0, 10);
    users = users.map(user => user.id);

    if (users.indexOf(currId) === 0 && !userToCheck.badgeIds.includes('6081b057093f9e1848684a95')) {
        await User.findOneAndUpdate(
            { _id: currId },
            { badgeIds: [...userToCheck.badgeIds, '6081b057093f9e1848684a95'] },
            { new: true },
        );
    }

    if (users.indexOf(currId) === 1 && !userToCheck.badgeIds.includes('6081b057093f9e1848684a94')) {
        await User.findOneAndUpdate(
            { _id: currId },
            { badgeIds: [...userToCheck.badgeIds, '6081b057093f9e1848684a94'] },
            { new: true },
        );
    }

    if (users.indexOf(currId) === 2 && !userToCheck.badgeIds.includes('6081b057093f9e1848684a93')) {
        await User.findOneAndUpdate(
            { _id: currId },
            { badgeIds: [...userToCheck.badgeIds, '6081b057093f9e1848684a93'] },
            { new: true },
        );
    }

    if (users.indexOf(currId) >= 3 && !userToCheck.badgeIds.includes('6081b057093f9e1848684a92')) {
        await User.findOneAndUpdate(
            { _id: currId },
            { badgeIds: [...userToCheck.badgeIds, '6081b057093f9e1848684a92'] },
            { new: true },
        );
    }
}

export default userTopBadgeCriterias;
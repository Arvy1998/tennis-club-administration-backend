import User from 'models/User';

const userGameBadgeCriterias = async (
    user,
    userRank,
    userId,
    includesTrenner,
    result,
    peopleCount,
) => {
    if (user) {
        /* check if user has 10 rating points */
        if (userRank >= 10 && !user.badgeIds.includes('6081b057093f9e1848684a8b')) {
            await User.findOneAndUpdate(
                { _id: userId },
                { badgeIds: [...user.badgeIds, '6081b057093f9e1848684a8b'] },
                { new: true },
            );
        }

        /* check if user has 100 rating points */
        if (userRank >= 100 && !user.badgeIds.includes('6081b057093f9e1848684a8c')) {
            await User.findOneAndUpdate(
                { _id: userId },
                { badgeIds: [...user.badgeIds, '6081b057093f9e1848684a8c'] },
                { new: true },
            );
        }

        /* check if user has won against trenner */
        if (includesTrenner && !user.badgeIds.includes('6081b057093f9e1848684a8e')) {
            await User.findOneAndUpdate(
                { _id: userId },
                { badgeIds: [...user.badgeIds, '6081b057093f9e1848684a8e'] },
                { new: true },
            );
        }

        /* check if user got his first victory */
        if (result === 'WON' && !user.badgeIds.includes('6081b057093f9e1848684a8f')) {
            await User.findOneAndUpdate(
                { _id: userId },
                { badgeIds: [...user.badgeIds, '6081b057093f9e1848684a8f'] },
                { new: true },
            );
        }

        /* check if game contained 4 people */
        if (peopleCount === 4 && !user.badgeIds.includes('6081b057093f9e1848684a90')) {
            await User.findOneAndUpdate(
                { _id: userId },
                { badgeIds: [...user.badgeIds, '6081b057093f9e1848684a90'] },
                { new: true },
            );
        }
    }
}

export default userGameBadgeCriterias;
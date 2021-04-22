import UserNotAuthorized from 'errors/UserNotAuthorized';

import News from 'models/News';
import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const updateNews = async (parent, args, { user }) => {
    let newsToEdit = args.newsInput;
    const userForAuthorization = await User.findOne({ email: user.email });

    /* only allow creating news if it's not another user */
    if (user.userId !== userForAuthorization._id.toString()) {
        throw new UserNotAuthorized();
    }

    const updatedNews = await News.findOneAndUpdate(
        { _id: args.id },
        filterNotDefinedFields(newsToEdit),
        { new: true },
    );
    return updatedNews;
};

export default updateNews;
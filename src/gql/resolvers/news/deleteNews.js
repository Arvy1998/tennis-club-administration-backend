import UserNotAuthorized from 'errors/UserNotAuthorized';

import News from 'models/News';
import User from 'models/User';

const deleteNews = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow deleting news if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const deletedNews = await News.findOneAndDelete({
    _id: args.id,
  });

  return deletedNews;
};

export default deleteNews;

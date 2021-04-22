import UserNotAuthorized from 'errors/UserNotAuthorized';

import News from 'models/News';
import User from 'models/User';

const listNews = async (parent, args, { user }) => {
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow viewing news information if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const newsToReturn = await News.find();
  return newsToReturn;
};

export default listNews;

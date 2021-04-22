import UserNotAuthorized from 'errors/UserNotAuthorized';

import News from 'models/News';
import User from 'models/User';

import filterNotDefinedFields from 'utils/filterNotDefinedFields';

const createNews = async (parent, args, { user }) => {
  const newsToEdit = args.newsInput;
  const userForAuthorization = await User.findOne({ email: user.email });

  /* only allow editing news if it's not another user */
  if (user.userId !== userForAuthorization._id.toString()) {
    throw new UserNotAuthorized();
  }

  const news = await News.create(filterNotDefinedFields(newsToEdit));
  return news;
};

export default createNews;

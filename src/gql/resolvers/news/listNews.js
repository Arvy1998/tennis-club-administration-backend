import News from 'models/News';

const listNews = async () => {
  const newsToReturn = await News.find();
  return newsToReturn;
};

export default listNews;

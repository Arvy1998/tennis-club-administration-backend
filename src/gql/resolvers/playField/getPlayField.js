import PlayField from 'models/PlayField';

const getPlayField = async (parent, args) => {

  const playFieldToReturn = await PlayField.findOne({ _id: args.id });
  return playFieldToReturn;
};

export default getPlayField;

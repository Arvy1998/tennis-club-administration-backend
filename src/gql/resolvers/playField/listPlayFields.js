import PlayField from 'models/PlayField';

const listPlayFields = async (parent, args, { user }) => {
  let playFieldsToReturn = [];

  if (args.playFieldQueryInput) {
    playFieldsToReturn = await PlayField.find(args.playFieldQueryInput);
  } else {
    playFieldsToReturn = await PlayField.find();
  }

  return playFieldsToReturn;
};

export default listPlayFields;

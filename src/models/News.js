import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,

  firstClubPlayingId: { type: String, index: true },
  secondClubPlayingId: { type: String, index: true },
  playFieldId: { type: String, index: true },

  date: String,
  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

newsSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* virtual fields must be serialised */
newsSchema.set('toJSON', {
  virtuals: true,
});

newsSchema.set('toObject', {
  virtuals: true,
});

const News = mongoose.model('News', newsSchema);
export default News;

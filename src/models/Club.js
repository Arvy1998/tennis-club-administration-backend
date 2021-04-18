import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  /* mongo database relational fields for apollo federation */
  creatorId: { type: String, index: true },
  userIds: { type: [String], index: true, default: [] },

  clubLogo: String,
  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

clubSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* virtual fields must be serialised */
clubSchema.set('toJSON', {
  virtuals: true,
});

clubSchema.set('toObject', {
  virtuals: true,
});

const Club = mongoose.model('Club', clubSchema);
export default Club;

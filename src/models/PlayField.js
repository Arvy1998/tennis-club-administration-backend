import mongoose from 'mongoose';

const playFieldSchema = new mongoose.Schema({
  title: String,
  address: String,
  cost: Number,
  ownerPhoneNumber: String,
  ownerEmailAddress: String,
  photoBuffer: String,
  courtsNumber: Number,
  courtType: String,
  courtFloorType: String,

  additionalInformation: String,
  webpage: String,
  workHours: String,
  rating: Number,

  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

playFieldSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* virtual fields must be serialised */
playFieldSchema.set('toJSON', {
  virtuals: true,
});

playFieldSchema.set('toObject', {
  virtuals: true,
});

const PlayField = mongoose.model('PlayField', playFieldSchema);
export default PlayField;

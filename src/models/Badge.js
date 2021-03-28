import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  badgeIcon: String,
  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

badgeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* virtual fields must be serialised */
badgeSchema.set('toJSON', {
  virtuals: true,
});

badgeSchema.set('toObject', {
  virtuals: true,
});

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;

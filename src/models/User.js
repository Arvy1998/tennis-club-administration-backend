import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  /* contact information, user management data */
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    index: true,
    unique: true,
  },
  role: {
    type: String,
    enum: [
      'PLAYER',
      'TRENNER',
      'ADMIN',
    ],
  },
  level: { type: Number },
  address: { type: String },
  city: { type: String },
  phoneNumber: { type: String },
  password: { type: String },
  /* mongo database relational fields for apollo federation */
  badgeIds: { type: [String], index: true },
  clubId: { type: String, index: true },
  reservationIds: { type: [String], index: true },
  gameIds: { type: [String], index: true },
  friendIds: { type: [String], index: true },
  userProfileFileId: { type: String, index: true },
  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* virtual fields must be serialised */
userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.set('toObject', {
  virtuals: true,
});

const User = mongoose.model('User', userSchema);
export default User;

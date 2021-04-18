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
  sex: {
    type: String,
    enum: [
      'MALE',
      'FEMALE',
      'OTHER',
    ],
  },
  level: {
    type: String,
    enum: [
      'LEVEL_1_5',
      'LEVEL_2_0',
      'LEVEL_2_5',
      'LEVEL_3_0',
      'LEVEL_3_5',
      'LEVEL_4_0',
      'LEVEL_4_5',
      'LEVEL_5_0',
      'LEVEL_5_5',
      'LEVEL_6_0_7_0',
      'LEVEL_7_0',
    ],
  },
  address: { type: String },
  city: { type: String },
  phoneNumber: { type: String },
  password: { type: String },

  mainHand: { type: String },
  details: { type: String },

  /* mongo database relational fields for apollo federation */
  clubId: { type: String, index: true },

  userProfilePhoto: { type: String },

  /* used for achievements and level */
  rating: { type: Number },

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

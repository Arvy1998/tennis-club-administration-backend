import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  scoreNumber: { type: Number, index: true },
  numberOfWins: { type: Number },
  numberOfLoses: { type: Number },
  scoreMultiplier: { type: Number },
  /* mongo database relational fields for apollo federation */
  gameId: { type: String, index: true },
  opponentIds: { type: [String], index: true },
  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

scoreSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* virtual fields must be serialised */
scoreSchema.set('toJSON', {
  virtuals: true,
});

scoreSchema.set('toObject', {
  virtuals: true,
});

const Score = mongoose.model('Score', scoreSchema);
export default Score;

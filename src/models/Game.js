import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  date: { type: Date, index: true },

  matches: [{
    firstTeamScore: Number,
    secondTeamScore: Number,
  }],
  
  /* mongo database relational fields for apollo federation */
  firstTeamFirstPlayerId: { type: String, index: true },
  firstTeamSecondPlayerId: { type: String, index: true },
  secondTeamFirstPlayerId: { type: String, index: true },
  secondTeamSecondPlayerId: { type: String, index: true },

  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

gameSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* virtual fields must be serialised */
gameSchema.set('toJSON', {
  virtuals: true,
});

gameSchema.set('toObject', {
  virtuals: true,
});

const Game = mongoose.model('Game', gameSchema);
export default Game;

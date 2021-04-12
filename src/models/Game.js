import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  date: { type: Date, index: true },

  matches: [{
    firstTeamScore: Number,
    secondTeamScore: Number,
  }],
  
  /* mongo database relational fields for apollo federation */
  firstTeamFirstPlayerId: String,
  firstTeamSecondPlayerId: String,
  secondTeamFirstPlayerId: String,
  secondTeamSecondPlayerId: String,

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

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  /* YYYY-MM-DD HH:mm:ss */
  startDateTime: { type: String, index: true },
  endDateTime: { type: String, index: true },
  /* mongo database relational fields for apollo federation */
  userId: { type: String, index: true },
  playFieldId: { type: String, index: true },

  /* planned rezervation fields */
  isRecurring: { type: Boolean, index: true },
  recurringDate: { type: Date, index: true },
  recurringPeriod: {
    type: Number,
    index: true,
    enum: [
      'DAY',
      'WEEK',
      'MONTH',
      'YEAR',
    ],
  },

  totalCost: { type: Number },
  paid: { type: Boolean },

  recurringEvery: { type: Number },
  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

reservationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* virtual fields must be serialised */
reservationSchema.set('toJSON', {
  virtuals: true,
});

reservationSchema.set('toObject', {
  virtuals: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;

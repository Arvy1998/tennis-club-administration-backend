require('dotenv').config();

import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017';

const connectDatabase = () => {
  mongoose.connect(mongoUrl, options);
  mongoose.connection.on('disconnected', () => {
    setTimeout(() => {
      mongoose.connect(mongoUrl, options);
    }, 3000);
  });
};

export default connectDatabase;

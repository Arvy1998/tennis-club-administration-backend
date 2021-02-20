import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://admin:4QCLheCcbipmmKoC@cluster0.aqqsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const mongoUrl = MONGO_URI || 'mongodb://localhost:27017';

const connectDatabase = () => {
  mongoose.connect(mongoUrl, options);
  mongoose.connection.on('disconnected', () => {
    setTimeout(() => {
      mongoose.connect(mongoUrl, options);
    }, 3000);
  });
};

export default connectDatabase;

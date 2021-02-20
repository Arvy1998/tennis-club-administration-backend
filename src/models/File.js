import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileName: { type: String, index: true, required: true },
  mime: String,
  size: Number,
  /* mongo database relational fields for apollo federation */
  userId: { type: String, required: true },
  /* historization fields */
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const File = mongoose.model('File', fileSchema);

export default File;

import mongoose from "mongoose";

const savedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  masonry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Masonry',
    required: true,
  },
  photo_url: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Saved = mongoose.model("Saved", savedSchema);

export default Saved;
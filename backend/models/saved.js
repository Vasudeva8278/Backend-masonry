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

savedSchema.index({ user: 1, masonry: 1 }, { unique: true });

const Saved = mongoose.model("Saved", savedSchema);

export default Saved;
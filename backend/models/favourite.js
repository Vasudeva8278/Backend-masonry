import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
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
  }
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;
const mongoose = require("mongoose");


const masonrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  photoUrl: {
    type: String,
    required: true, 
  },
});


const Masonry = mongoose.model("Masonry", masonrySchema);

module.exports = Masonry;

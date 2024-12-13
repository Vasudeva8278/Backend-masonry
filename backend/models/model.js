// models/model.js
const mongoose = require("mongoose");

// Define the schema for Masonry
const masonrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  photoUrl: {
    type: String,
    required: true, // photoUrl is required
  },
});

// Create the Masonry model using the schema
const Masonry = mongoose.model("Masonry", masonrySchema);

// Export the Masonry model to be used in other files
module.exports = Masonry;

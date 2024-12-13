const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Enable CORS
app.use(cors());

// Use JSON middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Import the Masonry model
const Masonry = require("./models/model"); // Ensure this path is correct

// Debug: Check if the MONGODB_URI environment variable is correctly loaded
console.log("MONGODB_URI:", process.env.MONGODB_URI);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// POST route to create new masonry data
app.post("/api/masonry", async (req, res) => {
  const { title, description, photoUrl } = req.body;

  console.log("Received data:", req.body);

  try {
    const newMasonry = new Masonry({ title, description, photoUrl });
    await newMasonry.save();
    console.log("Masonry data saved successfully:", newMasonry);

    res.status(201).json({
      message: "Masonry data saved successfully!",
      masonry: newMasonry,
    });
  } catch (error) {
    console.error("Error saving masonry data:", error);
    res.status(500).json({
      message: "Error saving masonry data",
      error: error.message,
    });
  }
});

// GET route to fetch all masonry data
app.get("/api/masonry", async (req, res) => {
  try {
    const masonries = await Masonry.find();
    res.status(200).json({
      message: "Masonry data fetched successfully",
      masonries: masonries,
    });
  } catch (error) {
    console.error("Error fetching masonry data:", error);
    res.status(500).json({
      message: "Error fetching masonry data",
      error: error.message,
    });
  }
});

// DELETE route to delete masonry by ID
app.delete("/api/masonry/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMasonry = await Masonry.findByIdAndDelete(id);

    if (!deletedMasonry) {
      return res.status(404).json({
        message: "Masonry not found",
      });
    }

    res.status(200).json({
      message: "Masonry deleted successfully",
      masonry: deletedMasonry,
    });
  } catch (error) {
    console.error("Error deleting masonry:", error);
    res.status(500).json({
      message: "Error deleting masonry",
      error: error.message,
    });
  }
});

// PUT route to update masonry by ID
app.put("/api/masonry/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, photoUrl } = req.body;

  try {
    const updatedMasonry = await Masonry.findByIdAndUpdate(
      id,
      { title, description, photoUrl },
      { new: true, runValidators: true }
    );

    if (!updatedMasonry) {
      return res.status(404).json({
        message: "Masonry not found",
      });
    }

    res.status(200).json({
      message: "Masonry updated successfully",
      masonry: updatedMasonry,
    });
  } catch (error) {
    console.error("Error updating masonry:", error);
    res.status(500).json({
      message: "Error updating masonry",
      error: error.message,
    });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

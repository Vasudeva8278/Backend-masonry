const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

app.use((req, res, next) => {
  console.log("Request Body:", req.body); // Log the raw request body
  next();
});


// Use JSON middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Import the Masonry model
const Masonry = require("./models/model"); // Ensure the path is correct for your project

// Debug: Check if the MONGODB_URI environment variable is correctly loaded
console.log("MONGODB_URI:", process.env.MONGODB_URI);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process if connection fails
  });

// POST route to create new masonry data
// POST route to create new masonry data
app.post("/api/masonry", async (req, res) => {
  const { title, description, photoUrl } = req.body;

  // Log the incoming request data for debugging purposes
  console.log("Received data:", req.body);

  // Validate required fields
  if (!title || !description || !photoUrl) {
    const errorMessage = "Missing required fields: title, description, or photoUrl";
    console.error(errorMessage); // Log the error message
    return res.status(400).json({
      message: errorMessage,
    });
  }

  try {
    // Create a new Masonry document
    const newMasonry = new Masonry({ title, description, photoUrl });

    // Save the document to the database
    await newMasonry.save();

    const successMessage = "Masonry data saved successfully!";
    console.log(successMessage); // Log the success message
    // Respond with a success message and the saved masonry data
    return res.status(201).json({
      message: successMessage,
      masonry: newMasonry,
    });
  } catch (error) {
    // Handle any errors during the save operation
    console.error("Error saving masonry data:", error);
    return res.status(500).json({
      message: "Error saving masonry data",
      error: error.message,
    });
  }
});

// GET route to fetch all masonry data
app.get("/api/masonry", async (req, res) => {
  try {
    // Fetch all masonry data from MongoDB
    const masonries = await Masonry.find();

    // Respond with the masonry data
    res.status(200).json({
      message: "Masonry data fetched successfully",
      masonries: masonries,
    });
  } catch (error) {
    // Handle any errors that occur during the fetch process
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
    // Find and delete the masonry by ID
    const deletedMasonry = await Masonry.findByIdAndDelete(id);

    if (!deletedMasonry) {
      return res.status(404).json({
        message: "Masonry not found",
      });
    }

    // Respond with a success message
    res.status(200).json({
      message: "Masonry deleted successfully",
      masonry: deletedMasonry,
    });
  } catch (error) {
    // Handle any errors that occur during the delete process
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
    // Find the masonry by ID and update its information
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

    // Respond with the updated masonry data
    res.status(200).json({
      message: "Masonry updated successfully",
      masonry: updatedMasonry,
    });
  } catch (error) {
    // Handle any errors that occur during the update process
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

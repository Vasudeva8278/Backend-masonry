const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();

const app = express();

app.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});


app.use(express.json());

const PORT = process.env.PORT || 5000;


const Masonry = require("./models/model"); // Ensure this path is correct

console.log("MONGODB_URI:", process.env.MONGODB_URI);


mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit process if connection fails
  });

app.post("/api/masonry", async (req, res) => {
  const { title, description, photoUrl } = req.body;


  console.log("Received data:", req.body);

 
  if (!title || !description || !photoUrl) {
    const errorMessage = "Missing required fields: title, description, or photoUrl";
    console.error(errorMessage);
    return res.status(400).json({ message: errorMessage });
  }

  try {
 
    const newMasonry = new Masonry({ title, description, photoUrl });
    await newMasonry.save();

    console.log("Masonry data saved successfully!");
    return res.status(201).json({
      message: "Masonry data saved successfully!",
      masonry: newMasonry,
    });
  } catch (error) {
    console.error("Error saving masonry data:", error);
    return res.status(500).json({
      message: "Error saving masonry data",
      error: error.message,
    });
  }
});


app.get("/api/masonry", async (req, res) => {
  try {
    const masonries = await Masonry.find();
    res.status(200).json({
      message: "Masonry data fetched successfully",
      masonries,
    });
  } catch (error) {
    console.error("Error fetching masonry data:", error);
    res.status(500).json({
      message: "Error fetching masonry data",
      error: error.message,
    });
  }
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

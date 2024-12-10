// Import the db configuration only once
const db = require('../config/db');

// Create image
exports.createImage = async (req, res) => {
  const { image_url, description } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO images (image_url, description) VALUES (?, ?)',
      [image_url, description]
    );
    res.status(201).json({ message: 'Image created successfully', imageId: result.insertId });
  } catch (error) {
    console.error('Error creating image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM images');
    res.status(200).json(rows);  // Send the result as JSON
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single image by ID
exports.getImageById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM images WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an image by ID
exports.updateImage = async (req, res) => {
  const { id } = req.params;
  const { image_url, description } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE images SET image_url = ?, description = ? WHERE id = ?',
      [image_url, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image updated successfully' });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an image by ID
exports.deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM images WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

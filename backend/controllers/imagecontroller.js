const db = require('../config/db');

exports.createImage = async (req, res) => {
  console.log('Request Body:', req.body); // Add this to check request data

  const { image_url, description } = req.body;

  if (!image_url || !description) {
    console.log('Missing fields');
    return res.status(400).json({ message: 'Image URL and description are required' });
  }

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

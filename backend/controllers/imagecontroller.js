const db = require('../config/db');

// POST: Add a new image
exports.addImage = async (req, res) => {
    const { image_url, description } = req.body;

    if (!image_url) {
        return res.status(400).json({ message: 'Image URL is required' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO images (image_url, description) VALUES (?, ?)',
            [image_url, description || null]
        );
        res.status(201).json({ message: 'Image added successfully', imageId: result.insertId });
    } catch (error) {
        console.error('Error adding image:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT: Update an existing image
exports.updateImage = async (req, res) => {
    const { id } = req.params;
    const { image_url, description } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE images SET image_url = ?, description = ? WHERE id = ?',
            [image_url || null, description || null, id]
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

// GET: Retrieve images (with optional pagination)
exports.getImages = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 items per page
    const offset = (page - 1) * limit;

    try {
        const [images] = await db.execute(
            'SELECT * FROM images ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [parseInt(limit), parseInt(offset)]
        );

        res.status(200).json({ images });
    } catch (error) {
        console.error('Error retrieving images:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

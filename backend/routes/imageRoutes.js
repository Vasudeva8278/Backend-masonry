const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// POST: Add a new image
router.post('/images', imageController.addImage);

// PUT: Update an existing image by ID
router.put('/images/:id', imageController.updateImage);

// GET: Retrieve images with pagination
router.get('/images', imageController.getImages);

module.exports = router;

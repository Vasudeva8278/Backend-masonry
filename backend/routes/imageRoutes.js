const express = require('express');
const imageController = require('../controllers/imagecontroller');
const router = express.Router();

// Create image
router.post('/images', imageController.createImage);

// Get all images
router.get('/images', imageController.getAllImages);

// Get image by ID
router.get('/images/:id', imageController.getImageById);

// Update image by ID
router.put('/images/:id', imageController.updateImage);

// Delete image by ID
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;

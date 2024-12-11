const express = require('express');
const router = express.Router();
const { createImage } = require('../controllers/imagecontroller');

router.post('/', createImage);

module.exports = router;

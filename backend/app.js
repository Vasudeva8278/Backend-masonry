const express = require('express');
const bodyParser = require('body-parser');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

// Use middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'uploads' directory (optional, if you want to serve images directly)
app.use('/uploads', express.static('uploads'));

// Use the image routes
app.use('/api', imageRoutes);  // This should work with '/api/images'

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

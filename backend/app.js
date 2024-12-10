const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const imageRoutes = require('./routes/imageRoutes');

dotenv.config(); // Load environment variables

const app = express();

// Enable CORS to allow communication between the frontend and backend
app.use(cors());

// Set up the routes
app.use('/api', imageRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

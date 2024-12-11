const express = require('express');
const imageRoutes = require('./routes/imageRoutes');
const app = express();

app.use(express.json()); // Middleware to parse JSON
app.use('/post/images', imageRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

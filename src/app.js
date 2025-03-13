const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

// Use the file routes
app.use('/api', fileRoutes);

// Add a test route to verify the server is running
app.get('/', (req, res) => {
  res.send('File Upload API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
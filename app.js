const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
  

// Mengimpor router untuk Movies dan Users
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

// Menggunakan router dalam aplikasi Express
app.use(movieRoutes);
app.use(userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

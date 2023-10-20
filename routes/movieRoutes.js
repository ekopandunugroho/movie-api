const express = require('express');
const path = require('path');
const movieController = require('../controllers/movieController');
const upload = require('../middleware/uploadMiddleware'); // Import middleware upload
const router = express.Router();


// Serve file statis dari direktori 'uploads'
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rute untuk mengunggah foto pada data Movies
router.post('/movies/uploads', upload.single('photo'), movieController.handleMoviePhotoUpload);

// Rute untuk mengakses foto pada data Movies
router.get('/movies/photo/:movieId', movieController.getMoviePhoto);



// Rute untuk menampilkan semua film
router.get('/movies', movieController.getAllMovies);

// Rute untuk menampilkan satu film berdasarkan ID
router.get('/movies/:id', movieController.getMovieById);

// Rute untuk membuat film baru
router.post('/movies', movieController.createMovie);

// Rute untuk memperbarui film berdasarkan ID
router.put('/movies/:id', movieController.updateMovie);

// Rute untuk menghapus film berdasarkan ID
router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;
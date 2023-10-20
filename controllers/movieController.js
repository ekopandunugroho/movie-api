const upload = require('../middleware/uploadMiddleware');
const { Movie } = require('../models/movie');
const path = require('path')

// Fungsi untuk mengunggah foto pada data Movies
exports.handleMoviePhotoUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
    }

    const movieId = req.params.movieId; // Pastikan Anda telah menentukan parameter :movieId di rute yang sesuai
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Film tidak ditemukan' });
    }

    movie.photo = req.file.buffer; // Menyimpan foto di dalam model Movie 
    await movie.save();

    res.status(201).json({ message: 'Foto berhasil diunggah' });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk mengambil foto dari data Movies
exports.getMoviePhoto = async (req, res, next) => {
  try {
    const movieId = req.params.movieId; // Pastikan Anda telah menentukan parameter :movieId di rute yang sesuai
    const movie = await Movie.findById(movieId);

    if (!movie || !movie.photo) {
      return res.status(404).json({ message: 'Foto tidak ditemukan' });
    }

    // Mengirimkan foto sebagai respons (asumsi menggunakan Buffer)
    res.set('Content-Type', 'photo/jpg'); // Sesuaikan dengan tipe file yang Anda gunakan
    res.send(movie.photo);
  } catch (error) {
    next(error);
  }
};

// Controller untuk mengunggah foto pada data Movies
exports.uploadMoviePhoto = upload.single('photo'); // 'photo' adalah nama field file dalam formulir

// Route untuk mengunggah foto
exports.handleMoviePhotoUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Dapatkan nama file yang di-upload dan simpannya dalam database atau di lokasi yang sesuai
    const filename = req.file.filename;

    return res.status(200).json({ message: 'File uploaded successfully', filename });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Menampilkan semua film
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menampilkan satu film berdasarkan ID
exports.getMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat film baru
exports.createMovie = async (req, res) => {
  const { title, genres, year, photo } = req.body;

  try {
    const newMovie = await Movie.create({ title, genres, year, photo });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Memperbarui film berdasarkan ID
exports.updateMovie = async (req, res) => {
  const movieId = req.params.id;
  const { title, genres, year, photo } = req.body;

  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    movie.title = title;
    movie.genres = genres;
    movie.year = year;
    movie.photo = photo;

    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Menghapus film berdasarkan ID
exports.deleteMovie = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await movie.destroy();
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
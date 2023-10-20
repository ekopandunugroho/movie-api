const { Movie } = require('../models');

// Fungsi untuk menampilkan semua film
exports.getAllMovies = async () => {
  try {
    return await Movie.findAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk menampilkan satu film berdasarkan ID
exports.getMovieById = async (movieId) => {
  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk membuat film baru
exports.createMovie = async (movieData) => {
  try {
    return await Movie.create(movieData);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk memperbarui film berdasarkan ID
exports.updateMovie = async (movieId, movieData) => {
  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }

    // Memperbarui properti film
    movie.set(movieData);
    await movie.save();
    return movie;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk menghapus film berdasarkan ID
exports.deleteMovie = async (movieId) => {
  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      throw new Error('Movie not found');
    }

    await movie.destroy();
  } catch (error) {
    throw new Error(error.message);
  }
};
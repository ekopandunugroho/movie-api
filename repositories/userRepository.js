const { User } = require('../models');

// Fungsi untuk menampilkan semua pengguna
exports.getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk menampilkan satu pengguna berdasarkan ID
exports.getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk membuat pengguna baru
exports.createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk memperbarui pengguna berdasarkan ID
exports.updateUser = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Memperbarui properti pengguna
    user.set(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fungsi untuk menghapus pengguna berdasarkan ID
exports.deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy();
  } catch (error) {
    throw new Error(error.message);
  }
};
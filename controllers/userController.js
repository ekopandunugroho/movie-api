const { User } = require('../models');

// Menampilkan semua pengguna
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menampilkan satu pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat pengguna baru
exports.createUser = async (req, res) => {
  const { email, gender, password, role } = req.body;

  try {
    const newUser = await User.create({ email, gender, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Memperbarui pengguna berdasarkan ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { email, gender, password, role } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.email = email;
    user.gender = gender;
    user.password = password;
    user.role = role;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Menghapus pengguna berdasarkan ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
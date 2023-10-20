const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rute untuk menampilkan semua pengguna
router.get('/users', userController.getAllUsers);

// Rute untuk menampilkan satu pengguna berdasarkan ID
router.get('/users/:id', userController.getUserById);

// Rute untuk membuat pengguna baru
router.post('/users', userController.createUser);

// Rute untuk memperbarui pengguna berdasarkan ID
router.put('/users/:id', userController.updateUser);

// Rute untuk menghapus pengguna berdasarkan ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authService = require('../services/authService');

router.get('/', usuarioController.getUsuarios)
router.get('/:id', usuarioController.getUsuarioById)
router.post('/', usuarioController.addUsuario)
router.put('/:id', authService, usuarioController.updateUsuario)
router.post('/ChangeStatus/:id', authService, usuarioController.changeUserStatus)

module.exports = router;
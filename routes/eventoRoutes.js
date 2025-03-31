const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const authService =  require("../services/authService");

router.get('/', authService, eventoController.getEventos)
router.post('/', authService, eventoController.addEvento)
router.put('/:id', authService, eventoController.updateEvento)
router.delete('/:id', authService, eventoController.deleteEvento)

module.exports = router


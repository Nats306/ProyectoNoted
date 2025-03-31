const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController')
const authService =  require("../services/authService");

router.get('/', authService, tareaController.getTareas)
router.post('/', authService, tareaController.addTarea)
router.put('/:id', authService, tareaController.updateTarea)
router.delete('/:id', authService, tareaController.deleteTarea)

module.exports = router
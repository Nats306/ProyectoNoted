const express = require('express');
const router = express.Router();
const sleepController = require('../controllers/sleepController');
const authService =  require("../services/authService");

router.get('/', authService, sleepController.getSleeps)
router.post('/', authService, sleepController.addSleep)
router.put('/:id', authService, sleepController.updateSleep)

module.exports = router

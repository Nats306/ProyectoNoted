const express = require('express');
const router = express.Router();
const moodMController = require('../controllers/moodMController');
const authService =  require("../services/authService");

router.get('/', authService, moodMController.getMoodsMonthly)
router.post('/', authService, moodMController.addMoodMonthly)
router.put('/:id', authService, moodMController.updateMoodMonthly)

module.exports = router;
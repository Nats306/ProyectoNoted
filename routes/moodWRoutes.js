const express = require('express')
const router = express.Router();
const moodWController = require('../controllers/moodWController');
const authService =  require("../services/authService");

router.get('/', authService, moodWController.getMoodsWeekly)
router.post('/', authService, moodWController.addMoodWeekly)
router.put('/:id', authService, moodWController.updateMoodWeekly)

module.exports = router
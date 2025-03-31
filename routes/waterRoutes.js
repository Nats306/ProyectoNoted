const express = require('express')
const router = express.Router();
const waterController = require('../controllers/waterController');
const authService =  require("../services/authService");

router.get('/', authService, waterController.getWaters)
router.post('/', authService, waterController.addWater)
router.put('/:id', authService, waterController.updateWater)

module.exports = router
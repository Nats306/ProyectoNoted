const express = require('express');
const router = express.Router();
const journalEntryController = require('../controllers/journalEntryController');
const authService =  require("../services/authService");

router.get('/', authService, journalEntryController.getJournalEntries)
router.post('/', authService, journalEntryController.addJournalEntry)
router.put('/:id', authService, journalEntryController.updateJournalEntry)

module.exports = router
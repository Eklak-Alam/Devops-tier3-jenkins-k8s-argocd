// routes/entryRoutes.js
const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.post('/', entryController.createEntry);
router.get('/', entryController.getAllEntries);
router.get('/:id', entryController.getEntryById);
router.put('/:id', entryController.updateEntry);
router.delete('/:id', entryController.deleteEntry);

module.exports = router;
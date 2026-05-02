const express = require('express');
const { getSchedule } = require('../controllers/scheduleController');

const router = express.Router();

// GET /schedule - Returns the optimized maintenance schedule
router.get('/', getSchedule);

module.exports = router;

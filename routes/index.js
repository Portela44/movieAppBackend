const router = require('express').Router();
const ErrorResponse = require('../utils/error');

// @desc    GET all the projects
// @route   GET /api/v1/
// @access  Public
router.get('/', async (req, res, next) => {
  res.send('REST API')
});

module.exports = router;
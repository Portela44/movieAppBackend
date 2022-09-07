const express = require('express');
const router = express.Router();
const ErrorResponse = require('../utils/error');
const {isAuthenticated} = require('../middlewares/jwt')


// @desc    User likes a review.
// @route   Post /:reviewId/like
// @access  User

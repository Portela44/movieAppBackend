const express = require('express');
const router = express.Router();
const ErrorResponse = require('../utils/error');
const {isAuthenticated} = require('../middlewares/jwt')
const Review = require("../models/Review");
const ReviewLike = require('../models/ReviewLike');

// @desc    User likes a review.
// @route   Post /:reviewId/add
// @access  User
router.post("/reviewId/addRemove", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    const {reviewId} = req.params;
    try {
        const existingLike = await ReviewLike.find({userId: userId, reviewId: reviewId});
        if(existingLike) {
            
        }
    } catch (error) {
        
    }
})

module.exports = router;
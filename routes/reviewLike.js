const express = require('express');
const router = express.Router();
const ErrorResponse = require('../utils/error');
const {isAuthenticated} = require('../middlewares/jwt')
const Review = require("../models/Review");
const ReviewLike = require('../models/ReviewLike');

// @desc    User likes a review.
// @route   POST reviewLike/:reviewId/add
// @access  User
router.post("/:reviewId/add", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    const {reviewId} = req.params;
    try {
        //const existingLike = await ReviewLike.findOne({userId: userId, reviewId: reviewId});
        //if(!existingLike) {
            const addedLike = await ReviewLike.create({userId: userId, reviewId: reviewId});
            res.status(201).json({data: addedLike})
        //} else {
            //return next(new ErrorResponse('This movie has been already liked', 400))
       // }
    } catch (error) {
        next(error);
    }
});

// @desc    User removes a like from a review.
// @route   DELETE reviewLike/:reviewId/remove
// @access  User
router.delete("/:reviewId/remove", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    const {reviewId} = req.params;
    try {
            const removedLike = await ReviewLike.findOneAndDelete({userId: userId, reviewId});
            res.status(202).json({data: removedLike})
    } catch (error) {
        next(error);
    }
});

module.exports = router;
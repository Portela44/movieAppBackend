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
            const addedLike = await ReviewLike.create({userId: userId, reviewId: reviewId});
            res.status(201).json({data: addedLike});
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

// @desc    User can see the number of likes
// @route   GET reviewLike/:reviewId/likeAmmount
// @access  User
router.get("/:reviewId/likeAmmount", isAuthenticated, async(req, res, next) => {
    const {reviewId} = req.params;
    try {
            const reviewLikes = await ReviewLike.find({reviewId});
            const numberOfLikes = reviewLikes.length
            res.status(202).json({data: numberOfLikes})
    } catch (error) {
        next(error);
    }
});

module.exports = router;
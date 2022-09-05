const express = require('express');
const router = express.Router();
const ErrorResponse = require('../utils/error');
const mongoose = require('mongoose');
const {isAuthenticated} = require('../middlewares/jwt')
const Review = require("../models/Review");

// @desc    Creates review in Database
// @route   POST /reviews/create
// @access  User
router.post('/:movieId/create', isAuthenticated, async (req,res,next)=>{
    const{movieId, voteId} = req.params
    const {titleReview ,review,likes} = req.body;
    const userId = req.payload._id
    try {
        const newReview = await Review.create({titleReview, review, userId, movieId,likes})
        res.status(201).json({data: newReview})
    } catch (error) {
        next(error)
    }
})

// @desc    Deletes review in Database
// @route   Delete /reviews/delete
// @access  User

router.delete('/:reviewId/delete', isAuthenticated, async ( req,res,next)=>{
    const{reviewId} = req.params;
    const userId = req.payload._id
    try {
        const foundReview = await Review.findById(reviewId);
        if(userId === foundReview.userId.toString()){
            const deletedReview = await Review.findByIdAndDelete(reviewId)
            res.status(202).json({data: deletedReview}) 
        } else {
            return next(new ErrorResponse("You are not the author of the review you are trying to delete", 400));
        }
    } catch (error) {
        next(error)
    }
})

// @desc    Shows 2 reviews with more likes
// @route   Get /reviewsMostLiked
// @access  Public

router.get('/reviewsMostLiked', async (req,res,next) =>{
    try {
    const reviews = await Review.find({});
    const sortedReviews = reviews.sort((a,b)=>(b.likes > a.likes)? 1 : -1)
    const twoFirst = sortedReviews.slice(0,2)
    res.status(200).json({data:twoFirst})
    } catch (error) {
    next(error)
    }
})

// @desc    Shows thus users most recent reviews
// @route   Get /recentUserReviews
// @access  User

router.get('/recentUserReviews', async (req,res,next) =>{
    try {
    const reviews = await Review.find({});
    const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1)
    const twoFirst = sortedReviews.slice(0,2)
    res.status(200).json({data:twoFirst})
    } catch (error) {
    next(error)
    }
})
module.exports = router;
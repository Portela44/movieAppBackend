const express = require('express');
const router = express.Router();
const ErrorResponse = require('../utils/error');
const mongoose = require('mongoose');
const {isAuthenticated} = require('../middlewares/jwt')
const Review = require("../models/Review");
const ReviewLike = require('../models/ReviewLike');

// @desc    Creates review in Database
// @route   POST /reviews/create
// @access  User
router.post('/:movieId/create', isAuthenticated, async (req,res,next)=>{
    const{movieId} = req.params
    const {titleReview, review} = req.body;
    const userId = req.payload._id
    try {
        const newReview = await Review.create({titleReview, review, userId, movieId})
        res.status(201).json({data: newReview})
    } catch (error) {
        next(error)
    }
});

// @desc    Deletes review in Database
// @route   Delete /reviews/delete
// @access  User
router.delete('/:reviewId/delete', isAuthenticated, async ( req,res,next)=>{
    const{reviewId} = req.params;
    const userId = req.payload._id
    try {
        const foundReview = await Review.findById(reviewId);
        console.log('THIS IS THE REVIEW FOUND:',foundReview)
        if(userId === foundReview.userId.toString()){
            const deletedReview = await Review.findByIdAndDelete(reviewId)
            res.status(202).json({data: deletedReview}) 
        } else {
            return next(new ErrorResponse("You are not the author of the review you are trying to delete", 400));
        }
        await ReviewLike.deleteMany({reviewId: reviewId})
    } catch (error) {
        next(error)
    }
});

// @desc    Shows the user's most recent reviews of a movie
// @route   Get /recentMovieReviews
// @access  User
router.get('/:movieId/recentMovieReviews', isAuthenticated, async (req,res,next) =>{
    const {movieId} = req.params
    try {
        const reviews = await Review.find({movieId: movieId});
        const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1)
        const twoFirst = sortedReviews.slice(0,2)
        res.status(200).json({data:twoFirst})
    } catch (error) {
    next(error)
    }
});

// @desc    Shows the user's most recent reviews.
// @route   Get /recentUserReviews
// @access  User
router.get('/recentUserReviews', isAuthenticated, async (req,res,next) =>{
    const userId = req.payload._id
    try {
        const reviews = await Review.find({userId: userId});
        const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1)
        const twoFirst = sortedReviews.slice(0,2)
        res.status(200).json({data:twoFirst})
    } catch (error) {
    next(error)
    }
});

// @desc    User likes a review.
// @route   Post /:reviewId/like
// @access  User
router.post('/:reviewId/like', isAuthenticated, async(req,res,next)=>{
    const userId = req.payload._id
    const {reviewId} = req.params
    try {
        //makes sure that user can only vote once
        const existingLike = await ReviewLike.find({userId:userId, reviewId})
        if(existingLike){
            await ReviewLike.findOneAndDelete({userId:userId, reviewId})
        }
        //creates the like
        const createLike = await ReviewLike.create({userId:userId, reviewId})
        res.status(201).json({data: createLike})
    } catch (error) {
        next(error)
    }
});

// @desc    User removes like.
// @route   Post /:reviewId/removeLike
// @access  User
router.delete('/:reviewId/removeLike', isAuthenticated, async(req,res,next)=>{
    const userId = req.payload._id
    const {reviewId} = req.params
    try {
        const deleteLike = await ReviewLike.findOneAndDelete({userId: userId, reviewId})
        res.status(202).json({data: deleteLike})
    } catch (error) {
        next(error)
    }
});

module.exports = router;
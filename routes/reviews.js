const express = require('express');
const router = express.Router();
const ErrorResponse = require('../utils/error');
const {isAuthenticated} = require('../middlewares/jwt')
const Review = require("../models/Review");
const ReviewLike = require('../models/ReviewLike');

// @desc    Creates review in Database
// @route   POST /reviews/create
// @access  User
router.post('/:movieId/create', isAuthenticated, async (req, res, next)=>{
    const{movieId} = req.params;
    const {titleReview, review} = req.body;
    const userId = req.payload._id;
    try {
        const newReview = await Review.create({titleReview, review, userId, movieId});
        res.status(201).json({data: newReview});
    } catch (error) {
        next(error);
    }
});

// @desc    Deletes review in Database
// @route   Delete /reviews/delete
// @access  User
router.delete('/:reviewId/delete', isAuthenticated, async ( req, res, next)=>{
    const{reviewId} = req.params;
    const userId = req.payload._id;
    try {
        const foundReview = await Review.findById(reviewId);
        if(userId === foundReview.userId.toString()){
            const deletedReview = await Review.findByIdAndDelete(reviewId);
            res.status(202).json({data: deletedReview});
        } else {
            return next(new ErrorResponse("You are not the author of the review you are trying to delete", 400));
        }
        await ReviewLike.deleteMany({reviewId: reviewId});
    } catch (error) {
        next(error);
    }
});

// @desc    Admin can delete any review
// @route   Delete /reviews/delete
// @access  User

//missing admin middleware

router.delete('/:reviewId/adminDelete', isAuthenticated, async ( req, res, next)=>{
    const{reviewId} = req.params;
    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        await ReviewLike.deleteMany({reviewId: reviewId});
        res.status(202).json({data: deletedReview});      
    } catch (error) {
        next(error);
    }
});

// @desc    Shows the movies most recent reviews
// @route   Get /reviews/recentMovieReviews
// @access  User
router.get('/:movieId/recent', isAuthenticated, async (req, res, next) =>{
    const {movieId} = req.params;
    try {
        const reviews = await Review.find({movieId: movieId});
        const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1);
        const twoFirst = sortedReviews.slice(0,2);
        res.status(200).json({data:twoFirst});
    } catch (error) {
        next(error);
    }
});

// @desc    Shows the movies recent reviews
// @route   Get /reviews/:movieId/allReviews
// @access  User
router.get('/:movieId/allReviews', isAuthenticated, async (req, res, next) =>{
    const {movieId} = req.params;
    try {
        const reviews = await Review.find({movieId: movieId});
        const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1);
        const restOfReviews = sortedReviews.slice(2);
        res.status(200).json({data:restOfReviews});
    } catch (error) {
        next(error);
    }
});


// @desc    Shows the user's most recent reviews.
// @route   Get /reviews/recentUserReviews
// @access  User
router.get('/recentUserReviews', isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id
    try {
        const reviews = await Review.find({userId: userId});
        const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1);
        const twoFirst = sortedReviews.slice(0,2);
        res.status(200).json({data:twoFirst});
    } catch (error) {
        next(error);
    }
});

// @desc    Shows the user's reviews
// @route   Get /reviews/allReviews
// @access  User
router.get('/allUserReviews', isAuthenticated, async (req, res, next) =>{
    const userId = req.payload._id
    try {
        const reviews = await Review.find({userId: userId});
        const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1);
        const allReviews = sortedReviews.slice(2);
        res.status(200).json({data:allReviews});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const ErrorResponse = require('../utils/error');
// const {isAuthenticated, isAdmin} = require('../middlewares/jwt')
// const Review = require("../models/Review");
// const ReviewLike = require('../models/ReviewLike');

// // @desc    Creates review in Database
// // @route   POST /reviews/create
// // @access  User
// router.post('/:movieId/create', isAuthenticated, async (req, res, next)=>{
//     const{movieId} = req.params;
//     const {titleReview, review} = req.body;
//     const userId = req.payload._id;
//     try {
//         const newReview = await Review.create({titleReview, review, userId, movieId});
//         res.status(201).json({data: newReview});
//     } catch (error) {
//         error = new ErrorResponse(message, 400);
//     }
// });
// // @desc    Deletes review in Database
// // @route   Delete /reviews/delete
// // @access  User
// router.delete('/:reviewId/delete', isAuthenticated, async ( req, res, next)=>{
//     const{reviewId} = req.params;
//     const userId = req.payload._id;
//     try {
//         const foundReview = await Review.findById(reviewId);
//         if(userId === foundReview.userId.toString()){
//             const deletedReview = await Review.findByIdAndDelete(reviewId);
//             res.status(202).json({data: deletedReview});
//         } else {
//             return next(new ErrorResponse("You are not the author of the review you are trying to delete", 400));
//         }
//         await ReviewLike.deleteMany({reviewId: reviewId});
//     } catch (error) {
//         error = new ErrorResponse(message, 400);
//     }
// });
// // @desc    Admin can delete any review
// // @route   Delete /reviews/delete
// // @access  User
// router.delete('/:reviewId/adminDelete', isAuthenticated,isAdmin, async ( req, res, next)=>{
//     const{reviewId} = req.params;
//     try {
//         const deletedReview = await Review.findByIdAndDelete(reviewId);
//         await ReviewLike.deleteMany({reviewId: reviewId});
//         res.status(202).json({data: deletedReview});      
//     } catch (error) {
//         error = new ErrorResponse(message, 400);
//     }
// });
// // @desc    Shows the movies reviews
// // @route   Get /reviews/:movieId/allReviews
// // @access  User
// router.get('/:movieId/allReviews', isAuthenticated, async (req, res, next) =>{
//     const {movieId} = req.params;
//     try {
//         const reviews = await Review.find({movieId: movieId}).populate('userId');
//         const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1);
//         res.status(200).json({data:sortedReviews});
//     } catch (error) {
//         error = new ErrorResponse(message, 400);
//     }
// });
// // @desc    Shows the user's reviews
// // @route   Get /reviews/allReviews
// // @access  User
// router.get('/allUserReviews', isAuthenticated, async (req, res, next) =>{
//     const userId = req.payload._id
//     try {
//         const reviews = await Review.find({userId: userId}).populate("movieId");
//         const sortedReviews = reviews.sort((a,b)=>(b.createdAt > a.createdAt)? 1 : -1);
//         res.status(200).json({data:sortedReviews});
//     } catch (error) {
//         error = new ErrorResponse(message, 400);
//     }
// });

// module.exports = router;
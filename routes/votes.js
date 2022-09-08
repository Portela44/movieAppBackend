const express = require("express");
const router = express.Router();
const {isAuthenticated} = require('../middlewares/jwt');
const Movie = require("../models/Movie");
const Vote = require("../models/Vote");
const ErrorResponse = require('../utils/error');

// const getNextMovie = async (user) => {
//     let votedMovieIdArr = [];
//     try {
//         let votes = await Vote.find({userId: user._id});
//         votes.forEach(vote => {
//             votedMovieIdArr.push(String(vote.movieId));
//         });
//         let nextMovie = await Movie.aggregate([{$sample: {size: 1}}]);
//         let nextMovie0 = nextMovie[0];
//         while(votedMovieIdArr.includes(String(nextMovie0._id))) {
//             nextMovie = await Movie.aggregate([{$sample: {size: 1}}]);
//             nextMovie0 = nextMovie[0];
//         };
//         for(let i = 0; i < nextMovie0.genres.length; i++) {
//             if(user.preferences.length > 0) {
//                 while(!user.preferences.includes(nextMovie0.genres[i])) {
//                     nextMovie = await Movie.aggregate([{$sample: {size: 1}}]);
//                     nextMovie0 = nextMovie[0];
//                 }
//             }
//         }
//     } catch (error) {
//         next(error);
//     }
//     return nextMovie0;
// };

// @desc    Posts vote to the database (like).
// @route   POST /votes/:movieId/like
// @access  User
router.post("/:movieId/like", isAuthenticated, async (req, res, next) => {
    const {movieId} = req.params;
    const user = req.payload;
    try {
        const existingVote = await Vote.find({userId: user._id, movieId: movieId});
        if(existingVote) {
            await Vote.findOneAndDelete({userId: user._id, movieId: movieId});
        }
        const voteAdded = await Vote.create({userId: user._id, movieId, vote:true});
        res.status(201).json({data: voteAdded});
    } catch (error) {
        next(error);
    }
});

// @desc    Posts vote to the database (dislike).
// @route   POST /votes/:movieId/dislike
// @access  User
router.post("/:movieId/dislike", isAuthenticated, async (req, res, next) => {
    const {movieId} = req.params;
    const user = req.payload;
    try {
        const existingVote = await Vote.find({userId: user._id, movieId: movieId});
        if(existingVote) {
            await Vote.findOneAndDelete({userId: user._id, movieId: movieId});
        }
        const voteAdded = await Vote.create({userId: user._id, movieId, vote:false});
        res.status(201).json({data: voteAdded});
    } catch (error) {
        next(error);
    }
});

// @desc    Posts vote to the database (ignore).
// @route   POST /votes/:movieId/ignore
// @access  User
router.post("/:movieId/ignore", isAuthenticated, async (req, res, next) => {
    const {movieId} = req.params;
    const user = req.payload;
    try {
        const existingVote = await Vote.find({userId: user._id, movieId: movieId});
        if(existingVote) {
            await Vote.findOneAndDelete({userId: user._id, movieId: movieId});
        }
        const voteAdded = await Vote.create({userId: user._id, movieId, ignore:true});
        res.status(201).json({data: voteAdded});
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;
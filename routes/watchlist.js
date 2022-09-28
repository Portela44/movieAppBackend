const express = require("express");
const router = express.Router();
const WatchList = require("../models/WatchList");
const ErrorResponse = require('../utils/error');
const {isAuthenticated} = require('../middlewares/jwt');

// @desc    Posts add movie to watchlist
// @route   POST /watchList/:movieId/add
// @access  User
router.post('/:movieId/add', isAuthenticated, async (req, res, next)=>{
    const userId = req.payload._id;
    const {movieId} = req.params;
    try {
        const movieInWatchList = await WatchList.findOne({userId: userId, movieId: movieId});
        if(!movieInWatchList){
            const addedMovie = await WatchList.create({movieId, userId:userId});
            res.status(201).json({data: addedMovie});
        } else {
            return next(new ErrorResponse('This movie is already in your watchlist', 400))
        }
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    Removes a movie from whatchlist
// @route   DELETE /watchList/:movieId/remove
// @access  User
router.delete('/:movieId/remove', isAuthenticated, async (req, res, next)=>{
    const userId = req.payload._id;
    const {movieId} = req.params;
    try {
        const removeMovie = await WatchList.findOneAndDelete({userId:userId, movieId});
        res.status(202).json({data: removeMovie});
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    Gets if a movie exists in watchlist
// @route   GET /watchList/:movieId/exists
// @access  User
router.get('/:movieId/exists', isAuthenticated, async (req, res, next)=>{
    const userId = req.payload._id;
    const {movieId} = req.params;
    try {
        const isInWatchList = await WatchList.find({userId:userId, movieId});
        isInWatchList.length > 0 ? res.status(202).json({data: true}) : res.status(202).json({data: false});
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    Show the user the movies in watchlist
// @route   GET /watchList
// @access  User
router.get('/', isAuthenticated, async (req, res, next)=>{
    const userId = req.payload._id;
    try {
        const moviesFromDb = await WatchList.find({userId: userId}).populate("movieId");
        res.status(200).json({data: moviesFromDb});
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});

module.exports = router;
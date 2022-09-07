const express = require("express");
const router = express.Router();
const WatchList = require("../models/WatchList");
const {isAuthenticated} = require('../middlewares/jwt');

// @desc    Posts add movie to watchlist
// @route   POST /watchList/:movieId/add
// @access  User
router.post('/:movieId/add', isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    const {movieId} = req.params;
    try {
        const addedMovie = await WatchList.create({movieId, userId:userId})
        res.status(201).json({data: addedMovie})
    } catch (error) {
        next(error);
    }
});

// @desc    Removes a movie from whatchlist
// @route   POST /watchList/:movieId/remove
// @access  User
router.delete('/:movieId/remove', isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    const {movieId} = req.params;
    try {
        const removedMovie = await WatchList.findOneAndDelete({userId:userId, movieId});
        res.status(202).json({data: removedMovie});
    } catch (error) {
        next(error);
    }
});

// @desc    Show the user the movies in watchlist
// @route   GET /watchList
// @access  User
router.get('/', isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    try {
        const moviesFromDb = await WatchList.find({userId: userId});
        res.status(200).json({data: moviesFromDb});
    } catch (error) {
        next(error)
    }
});

module.exports = router;
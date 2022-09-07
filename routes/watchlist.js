const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Vote = require("../models/Vote");
const User = require("../models/User");
const WatchList = require("../models/WatchList");
const {isAuthenticated} = require('../middlewares/jwt');

// @desc    Posts add movie to watchlist
// @route   POST /watchList/:movieId/addToWatchlist
// @access  User

router.post('/:movieId/addToWatchlist', isAuthenticated, async (req,res,next)=>{
    const userId = req.payload._id
    const {movieId} = req.params
    try {
        const addMovie = await WatchList.create({movieId, userId:userId})
        res.status(201).json({data: addMovie})
    } catch (error) {
        next(error)
    }
})

// @desc    Removes a movie from whatchlist
// @route   POST /watchList/:movieId/remove
// @access  User

router.delete('/:movieId/remove', isAuthenticated, async (req,res,next)=>{
    const userId = req.payload._id
    const {movieId} = req.params
    try {
        const removeMovie = await WatchList.findOneAndDelete({userId:userId, movieId})
        res.status(202).json({data: removeMovie})
    } catch (error) {
        next(error)
    }
})
// @desc    Show the user the movies in watchlist
// @route   GET /watchList/myWatchList
// @access  User

router.get('/myWatchList', isAuthenticated, async (req,res,next)=>{
    const userId = req.payload._id
    try {
        const moviesFromDb = await WatchList.find({userId: userId})
        res.status(200).json({data: moviesFromDb})
    } catch (error) {
        next(error)
    }
})


module.exports = router;
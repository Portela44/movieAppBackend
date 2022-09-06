const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Vote = require("../models/Vote");
const User = require("../models/User");
const {isAuthenticated} = require('../middlewares/jwt') 

// @desc    Posts add movie to array watchlist
// @route   POST /votes/:movieId/watchLater
// @access  User
router.post('/:movieId/addToWatchlist', isAuthenticated, async (req,res,next)=>{
const user = req.payload;
const{movieId}= req.params;
console.log(user.watchList)
try {
    const foundMovieDb = await Movie.findById(movieId)
   // console.log(foundMovieDb)
    
    //res.status(201).json({data: movieAdded})
} catch (error) {
    next(error)
}

})


module.exports = router;
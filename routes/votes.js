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
router.put('/:movieId/addToWatchlist', isAuthenticated, async (req,res,next)=>{
const userId = req.payload._id
const user = req.payload
const{movieId}= req.params;
console.log(user._id)
//console.log('MOVIE ID:!', movieId)
//console.log(user.watchList)
try {
    const foundMovie = await Movie.findById(movieId)
    const newWatchList = user.watchList.push(foundMovie)
    //console.log('this is new watchlist:',newWatchList)
    const updatedUser = await User.findByIdAndUpdate(user, {watchList: newWatchList}, {new: true});
    req.payload = updatedUser;
    //console.log('this is updated user:', updatedUser)
    res.status(202).json({data: updatedUser})
} catch (error) {
    next(error)
}
})


module.exports = router;
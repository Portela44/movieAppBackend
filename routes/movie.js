const router = require("express").Router();
const ErrorResponse = require("../utils/error");
const Movie = require("../models/Movie");
const Vote = require("../models/Vote");
const User = require("../models/User");

// IMDB API requirements
const imdbId = require("imdb-id");
const metafilm = require("metafilm");
const colage = require("colage");
const { isAuthenticated } = require("../middlewares/jwt");

// @desc    Shows all movies ignored by the user
// @route   GET /movies/ignored
// @access  User
router.get("/ignored", isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    try {
        const votesWithIgnored = await Vote.find({ userId: userId }).populate("movieId");
        res.status(202).json({data: votesWithIgnored});
    } catch (error) {
        next(error);
    }
});

// @desc    Shows its own vote list to each user
// @route   GET /movies/voteList
// @access  User
router.get("/voteList", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    try {
        const votedMovies = await Vote.find({userId: userId}).populate("movieId");
        res.status(202).json({data: votedMovies});
    } catch (error) {
        next(error);
    }
});

// @desc    Displays a view where user can search a movie
// @route   GET /movies/search-movie
// @access  Public
router.get("/search-movie", async(req, res, next) => {
    const movieSearchString = req.query;
    try {
        const foundMovies = await Movie.find({title: {$regex: `(.*)${movieSearchString}(.*)`}}).limit(10);
        res.status(202).json({data: foundMovies});
    } catch (error) {
        next(error);
    }
});

router.get("/")

module.exports = router;
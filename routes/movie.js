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

// @desc    Displays movie information coming from an API in the console, so it can be copy-pasted into the seed. Search is made by movie title.
// @route   GET /movies/api-search-by-name
// @access  Admin
router.get("/api-search-by-name", async(req, res, next) => {
    const movieSearchString = req.query;
    try {
        const movieImdbId = await imdbId(`${movieSearchString}`);
        const movieInfo = await metafilm.id({ imdb_id: `${movieImdbId}` });
        res.status(202).json({data: movieInfo});
    } catch (error) {
        next(error);
    }
});

// @desc    Displays movie information coming from an API in the console, so it can be copy-pasted into the seed. Search is made by imdbId.
// @route   GET /movies/api-search-by-imdbId
// @access  Admin
router.get("/api-search-by-imdbId", async(req, res, next) => {
    const movieIdString = req.query;
    try {
        const movieInfo = await metafilm.id({ imdb_id: `${movieIdString}` });
        res.status(202).json({data: movieInfo});
    } catch (error) {
        next(error);
    }
});

// @desc    Deletes a movie from the database.
// @route   DELETE /movies/:movieId/delete
// @access  Admin
router.get("/:movieId/delete", async(req, res, next) => {
    const {movieId} = req.params;
    try {
        const deletedMovie = Movie.findByIdAndDelete(movieId)
        res.status(202).json({data: deletedMovie});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
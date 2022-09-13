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
const Review = require("../models/Review");
const ReviewLike = require("../models/ReviewLike");

// @desc    Gets a random movieId considering user preferences and 
// @route   GET /movies/next
// @access  User
router.get("/next", isAuthenticated, async(req, res, next) => {
    const user = req.payload;
    let votedMovieIdArr = [];
    try {
        let votes = await Vote.find({userId: user._id});
        votes.forEach(vote => {
            votedMovieIdArr.push(String(vote.movieId));
        });
        let nextMovie = await Movie.aggregate([{$sample: {size: 1}}]);
        let nextMovie0 = nextMovie[0];
        while(votedMovieIdArr.includes(String(nextMovie0._id))) {
            nextMovie = await Movie.aggregate([{$sample: {size: 1}}]);
            nextMovie0 = nextMovie[0];
        };
        for(let i = 0; i < nextMovie0.genres.length; i++) {
            if(user.preferences.length > 0) {
                while(!user.preferences.includes(nextMovie0.genres[i])) {
                    nextMovie = await Movie.aggregate([{$sample: {size: 1}}]);
                    nextMovie0 = nextMovie[0];
                }
            }
        }
        res.status(202).json({data: nextMovie0});
    } catch (error) {
        next(error);
    }
});

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

// @desc    Searches for a movie in the database based on a user body input.
// @route   GET /movies/search-movie
// @access  Public
router.get("/:search", async(req, res, next) => {
    const {search}  = req.params;
    try {
        const foundMovies = await Movie.find({name: {$regex: `${search}`, $options: "i"}}).limit(1);
        res.status(202).json({data: foundMovies});
        console.log(foundMovies);
    } catch (error) {
        next(new ErrorResponse('Something went wrong', 400));
    }
});

// @desc    Displays movie information coming from an API in the console, so it can be copy-pasted into the seed. Search is made by movie title.
// @route   GET /movies/api-search-by-name
// @access  Admin
router.get("/api-search-by-name", async(req, res, next) => {
    const { movieSearchString } = req.body;
    try {
        const movieImdbId = await imdbId(`${movieSearchString}`);
        const movieInfo = await metafilm.id({ imdb_id: `${movieImdbId}` })
        res.status(202).json({data: movieInfo});
    } catch (error) {
        next(error);
    }
});

// @desc    Displays movie information coming from an API in the console, so it can be copy-pasted into the seed. Search is made by imdbId.
// @route   GET /movies/api-search-by-imdbId
// @access  Admin
router.get("/api-search-by-imdbId", async(req, res, next) => {
    const { movieIdString } = req.body;
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
router.delete("/:movieId/delete", async(req, res, next) => {
    const {movieId} = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        await Vote.deleteMany({movieId: movieId});
        await Review.deleteMany({movieId: movieId});
        await ReviewLike.deleteMany({movieId: movieId});
        res.status(202).json({data: deletedMovie});
    } catch (error) {
        next(error);
    }
});

// @desc    Displays de pre-filled form to edit a movie.
// @route   GET /movies/:movieId/edit
// @access  Admin
router.get("/:movieId/edit", async(req, res, next) => {
    const {movieId} = req.params;
    try {
        const movieToEdit = await Movie.findById(movieId)
        res.status(202).json({data: movieToEdit});
    } catch (error) {
        next(error);
    }
});

// @desc    Edits a movie.
// @route   PUT /movies/:movieId/edit
// @access  Admin
router.put("/:movieId/edit", async(req, res, next) => {
    const {movieId} = req.params;
    const { imdb_id, name, year, image1, premiere, genre1, genre2, genre3, department1, people1, department2, people2, department3, people3, imdb_rating, imdb_vote, poster1, overview } = req.body;
    const image = { og: image1 }
    const genres = [genre1, genre2, genre3];
    const people = [{ name: people1, department: department1 }, { name: people2, department: department2 }, { name: people3, department: department3 }];
    const poster = { og: poster1 };
    const translations = [{ overview, poster }]
    try {
        const editedMovie = await Movie.findByIdAndUpdate(movieId, { imdb_id, name, year, image, premiere, genres, people, imdb_rating, imdb_vote, translations }, { new: true });
        res.status(202).json({data: editedMovie});
    } catch (error) {
        next(error);
    }
});

// @desc    Creates a new movie in the database
// @route   POST /movies/create
// @access  Admin
router.post("/create", async(req, res, next) => {
    const { imdb_id, name, year, image1, premiere, genre1, genre2, genre3, department1, people1, department2, people2, department3, people3, imdb_rating, imdb_vote, poster1, overview } = req.body;
    const image = { og: image1 }
    const genres = [genre1, genre2, genre3];
    const people = [{ name: people1, department: department1 }, { name: people2, department: department2 }, { name: people3, department: department3 }];
    const poster = { og: poster1 };
    const translations = [{ overview, poster }]
    try {
        const newMovie = await Movie.create({ imdb_id, name, year, image, premiere, genres, people, imdb_rating, imdb_vote, translations});
        res.status(202).json({data: newMovie});
    } catch (error) {
        next(error);
    }
});

// @desc    Shows its own vote list to each user, sorted by release date (premiere)
// @route   GET /movies/byDate
// @access  User
router.get("/voteList/byYear", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    try {
        const votedMovies = await Vote.find({userId: userId}).populate("movieId");
        votedMovies.sort((a, b) => { return b.movieId.year - a.movieId.year});
        res.status(202).json({data: votedMovies});
    } catch (error) {
        next(error);
    }
});

// @desc    Shows its own vote list to each user, sorted by popularity (premiere)
// @route   GET /movies/byRating
// @access  User
router.get("/voteList/byRating", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    try {
        const votedMovies = await Vote.find({userId: userId}).populate("movieId");
        votedMovies.sort((a, b) => { return b.movieId.imdb_rating - a.movieId.imdb_rating;});
        res.status(202).json({data: votedMovies});
    } catch (error) {
        next(error);
    }
});

// @desc    Shows its own vote list to each user, sorted by popularity (premiere)
// @route   GET /movies/byPopularity
// @access  User
router.get("/voteList/byPopularity", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    try {
        const votedMovies = await Vote.find({userId: userId}).populate("movieId");
        votedMovies.sort((a, b) => { return b.movieId.imdb_vote - a.movieId.imdb_vote;});
        res.status(202).json({data: votedMovies});
    } catch (error) {
        next(error);
    }
});

// @desc    Displays a movie by Id which can be consulted or voted.
// @route   GET /:movieId
// @access  User
router.get("/:movieId", async(req, res, next) => {
    const {movieId} = req.params;
    try {
        const movieFromDB = await Movie.findById(movieId);
        res.status(202).json({data: movieFromDB});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
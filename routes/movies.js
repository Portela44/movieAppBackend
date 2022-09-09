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
router.get("/search-movie", async(req, res, next) => {
    const { movieSearchString } = req.body;
    try {
        const foundMovies = await Movie.find({name: {$regex: `${movieSearchString}`, $options: "i"}}).limit(1);
        res.status(202).json({data: foundMovies});
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
    const { imdb_id, name, year, image1, premiere, genre1, genre2, genre3, people1, people2, people3, imdb_rating, imdb_vote, poster1, overview } = req.body;
    const image = { og: image1 }
    const genres = [genre1, genre2, genre3];
    const people = [{ name: people1 }, { name: people2 }, { name: people3 }];
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
    const { imdb_id, name, year, image1, premiere, genre1, genre2, genre3, people1, people2, people3, imdb_rating, imdb_vote, poster1, overview } = req.body;
    const image = { og: image1 }
    const genres = [genre1, genre2, genre3];
    const people = [{ name: people1 }, { name: people2 }, { name: people3 }];
    const poster = { og: poster1 };
    const translations = [{ overview, poster }]
    try {
        const newMovie = await Movie.create({ imdb_id, name, year, image, premiere, genres, people, imdb_rating, imdb_vote, translations}, { new: true });
        console.log(newMovie);
        res.status(202).json({data: newMovie});
    } catch (error) {
        next(error);
    }
});

// @desc    Shows its own vote list to each user, sorted by release date (premiere)
// @route   GET /movies/byDate
// @access  User
router.get("/voteList/byDate", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    try {
        const votedMovies = await Vote.find({userId: userId}).populate("movieId");
        votedMovies.sort((a, b) => { return b.movieId.premiere - a.movieId.premiere;});
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

// @desc    Allows the user to update its own filters to get personalized recommendations.
// @route   POST /movies/filter
// @access  User
router.post("/filter", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    const {action, drama, fantasy, comedy, mystery, adventure, war, scifi, romance, history, documentary, crime} = req.body;
    const newPreferences = [];
    if(req.body.action === "on") {
        newPreferences.push("1");
    };
    if(req.body.drama === "on") {
        newPreferences.push("12");
    };
    if(req.body.fantasy === "on") {
        newPreferences.push("14");
    };
    if(req.body.comedy === "on") {
        newPreferences.push("8");
    };
    if(req.body.mystery === "on") {
        newPreferences.push("22");
    };
    if(req.body.adventure === "on") {
        newPreferences.push("3");
    };
    if(req.body.war === "on") {
        newPreferences.push("34");
    };
    if(req.body.scifi === "on") {
        newPreferences.push("27");
    };
    if(req.body.romance === "on") {
        newPreferences.push("26");
    };
    if(req.body.history === "on") {
        newPreferences.push("20");
    };
    if(req.body.documentary === "on") {
        newPreferences.push("11");
    };
    if(req.body.crime === "on") {
        newPreferences.push("10");
    };
    try {
        const updatedPrefUser = await User.findByIdAndUpdate(userId, {preferences: newPreferences}, {new: true});
        req.payload = updatedPrefUser;
        res.status(202).json({data: newPreferences});
    } catch (error) {
        next(error)
    }
});

// @desc    Displays a random movie which can be consulted or voted.
// @route   GET /:movieId
// @access  User
router.get("/:movieId", isAuthenticated, async(req, res, next) => {
    const movieId = req.params;
    try {
        const movieFromDB = await Movie.findById(movieId);
        res.status(202).json({data: movieFromDB});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
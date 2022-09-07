const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Vote = require("../models/Vote");
const User = require("../models/User");
const WatchList = require("../models/WatchList");
const {isAuthenticated} = require('../middlewares/jwt');



module.exports = router;
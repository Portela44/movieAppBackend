const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin} = require('../middlewares/jwt')
const User = require("../models/User");
const fileUploader = require('../config/cloudinary.config');
const ErrorResponse = require('../utils/error');



// @desc    Allows the user to update its own filters to get personalized recommendations.
// @route   PUT /preferences/update
// @access  User
router.put("/update", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    const {action, drama, fantasy, comedy, mystery, adventure, war, scifi, romance, history, documentary, crime} = req.body;
    const newPreferences = [];
    if(action === true) {
        newPreferences.push("1");
    };
    if(drama === true) {
        newPreferences.push("12");
    };
    if(fantasy === true) {
        newPreferences.push("14");
    };
    if(comedy === true) {
        newPreferences.push("8");
    };
    if(mystery === true) {
        newPreferences.push("22");
    };
    if(adventure === true) {
        newPreferences.push("3");
    };
    if(war === true) {
        newPreferences.push("34");
    };
    if(scifi === true) {
        newPreferences.push("27");
    };
    if(romance === true) {
        newPreferences.push("26");
    };
    if(history === true) {
        newPreferences.push("20");
    };
    if(documentary === true) {
        newPreferences.push("11");
    };
    if(crime === true) {
        newPreferences.push("10");
    };
    try {
        await User.findOneAndUpdate({userId:userId}, {preferences: newPreferences});
        res.status(202).json({data: newPreferences});
    } catch (error) {
        next(error)
    }
});

module.exports = router;

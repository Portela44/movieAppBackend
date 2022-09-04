const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {isAuthenticated} = require('../middlewares/jwt')
const User = require("../models/User");
const fileUploader = require('../config/cloudinary.config');


// @desc    Updates user from the Database
// @route   GET /user/edit
// @access  User

router.put('/edit', isAuthenticated, fileUploader.single('imageUrl'), async (req,res,next) =>{
    const userId = req.payload._id;
    const {username, email, existingImage} = req.body
    //if user don't update image, it will keep the same.
    let imageUrl;
    if (req.file) {
        imageUrl = req.file.path;
    } else {
        imageUrl = existingImage
    }
    try {
        const userFromDB = await User.findByIdAndUpdate(userId, {username, email, imageUrl}, {new: true})
        req.payload = userFromDB
        res.status(202).json({data: userFromDB})
    } catch (error) {
        next(error)
    }
})

// @desc    Deletes user from the Database
// @route   GET /user/edit
// @access  User

router.delete('/delete', isAuthenticated, async (req,res,next) =>{
    const userId = req.payload
    try {
        const deletedUser = await User.findByIdAndDelete(userId)
        res.status(202).json({data: deletedUser})
    } catch (error) {
        next(error)
    }
})

module.exports = router;
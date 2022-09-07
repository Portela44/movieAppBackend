const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middlewares/jwt')
const User = require("../models/User");
const fileUploader = require('../config/cloudinary.config');


// @desc    Updates user from the Database
// @route   PUT /user/edit
// @access  User
router.put('/edit', isAuthenticated, fileUploader.single('imageUrl'), async (req,res,next) =>{
    const userId = req.payload._id;
    const {username, email,biography, existingImage} = req.body
    let imageUrl;
    if (req.file) {
        imageUrl = req.file.path;
    } else {
        imageUrl = existingImage;
    }
    try {
        const userFromDB = await User.findByIdAndUpdate(userId, {username, email,biography, imageUrl}, {new: true});
        req.payload = userFromDB;
        res.status(202).json({data: userFromDB});
    } catch (error) {
        next(error);
    }
});

// @desc    Deletes user from the Database
// @route   DELETE /user/delete
// @access  User
router.delete('/delete', isAuthenticated, async (req,res,next) =>{
    const userId = req.payload;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(202).json({data: deletedUser});
    } catch (error) {
        next(error);
    }
});

// @desc    Shows userlist to Admin
// @route   Get /user/userList
// @access  Admin
router.get('/userList', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin} = require('../middlewares/jwt')
const User = require("../models/User");
const fileUploader = require('../config/cloudinary.config');
const ErrorResponse = require('../utils/error');

// @desc    Uploads a picture in claudinary
// @route   GET /user/upload
// @access  User
router.post('/upload', fileUploader.single('imageUrl'), (req,res,next) =>{
    if(!req.file){
        next(new ErrorResponse('No file uploaded', 500));
        return;
    }
    res.json({fileUrl: req.file.path});
});
// @desc    gets the logged in user
// @route   GET /user/loggedInUser
// @access  User
router.get('/loggedInUser', isAuthenticated, async (req,res,next) =>{
    try {
        const user = await User.findById(req.payload._id);
        if(!user){
            next(new ErrorResponse('No user found', 404));
            return;
        }
        res.status(200).json({data: user})
    } catch (error) {
        next(error)
    }
})

// @desc    Updates user from the Database
// @route   PUT /user/edit
// @access  User

router.put('/edit', isAuthenticated, async (req,res,next) =>{
    const {username, email, biography, imageUrl} = req.body
    if(email === '' || username === ''){
        return next(new ErrorResponse('Please fill all the fields.', 400))
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
         return next(new ErrorResponse('Email is not a valid format', 400))
    }
  try {
    const user = await User.findById(req.payload._id);
    if(!user){
        next(new ErrorResponse('No user found', 404));
        return;
    } else{
        const updatedUser = await User.findByIdAndUpdate(req.payload._id, req.body, {new:true});
        res.status(200).json({data: updatedUser})
    }
  } catch (error) {
    next(error)
  }
})
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
// @desc    Admin can delete any users
// @route   DELETE /user/:userId/delete
// @access  Admin
router.delete('/:userId/delete', isAuthenticated, isAdmin, async (req,res,next) =>{
    const {userId} = req.params;
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
router.get('/userList', isAuthenticated,isAdmin, async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
});
// @desc    Allows the user to update its own filters to get personalized recommendations.
// @route   PUT /user/preferences
// @access  User
router.put("/preferences", isAuthenticated, async(req, res, next) => {
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
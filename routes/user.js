const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middlewares/jwt')
const User = require("../models/User");
const fileUploader = require('../config/cloudinary.config');
const ErrorResponse = require('../utils/error');


// @desc    Updates user from the Database
// @route   PUT /user/edit
// @access  User
// router.put('/edit', isAuthenticated, fileUploader.single('imageUrl'), async (req,res,next) =>{
//     const userId = req.payload._id;
//     const {username, email,biography, existingImage} = req.body
//     let imageUrl;
//     if (req.file) {
//         imageUrl = req.file.path;
//     } else {
//         imageUrl = existingImage;
//     }
//     try {
//         const userFromDB = await User.findByIdAndUpdate(userId, {username, email,biography, imageUrl}, {new: true});
//         req.payload = userFromDB;
//         res.status(202).json({data: userFromDB});
//     } catch (error) {
//         next(error);
//     }
// });

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
    const {username, email, biography, existingImage} = req.body

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
// @access  User

// missing is admin middleware
router.delete('/:userId/delete', isAuthenticated, async (req,res,next) =>{
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
router.get('/userList', async (req, res, next) => {
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

module.exports = router;
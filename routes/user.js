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

module.exports = router;
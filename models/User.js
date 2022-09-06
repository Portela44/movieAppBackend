const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  imageUrl:{
    type: String,
  },
  watchList:{
    type: [Schema.Types.ObjectId],
    ref: "Movie",
    default:[]
  },
  preferences: {
    type: [String],
    default: []
  },
  biography:{
    type: String,
    required: true,
    default: 'This is my biography.'
  }
},
  {
    timestamps: true
  });

module.exports = model("User", userSchema);
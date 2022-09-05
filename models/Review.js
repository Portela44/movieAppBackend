const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const reviewSchema = new Schema(
    {
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        titleReview:{
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        likes: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Review", reviewSchema);
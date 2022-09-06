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
        voteId:{
            type: Schema.Types.ObjectId,
            ref:"Vote",
        },
        titleReview:{
            type: String,
            required: true,
        },
        review: {
            type: String,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true
    }
);

module.exports = model("Review", reviewSchema);
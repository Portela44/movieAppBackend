const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const reviewSchema = new Schema(
    {
        movie_id: {
            type: [Schema.Types.ObjectId],
            ref: "Movie",
        },
        user_id: {
            type: [Schema.Types.ObjectId],
            ref: "User",
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
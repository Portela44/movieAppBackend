const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const watchListSchema = new Schema(
    {
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true
    }
);

module.exports = model("WatchList", watchListSchema);
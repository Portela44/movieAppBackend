const {Schema, model } = require("mongoose")

const voteSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        movieId: {
            type: Schema.Types.ObjectId,
            ref: "Movie"
        },
        vote: {
            type: Boolean,
        },
        ignore: {
            type: Boolean,
        },
        watchlist: {
            type: Boolean,
        }
    }
);

module.exports = model("Vote", voteSchema);
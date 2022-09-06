const mongoose = require("mongoose")
const {Schema, model} = mongoose;

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
    }
);

module.exports = model("Vote", voteSchema);
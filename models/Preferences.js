const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const preferencesSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        action:{
            type: Boolean,
            default: false
        },
        drama:{
            type: Boolean,
            default: false
        },
        fantasy:{
            type: Boolean,
            default: false
        },
        comedy:{
            type: Boolean,
            default: false
        },
        mystery:{
            type: Boolean,
            default: false
        },
        adventure:{
            type: Boolean,
            default: false
        },
        war:{
            type: Boolean,
            default: false
        },
        scify:{
            type: Boolean,
            default: false
        },
        romance:{
            type: Boolean,
            default: false
        },
        history:{
            type: Boolean,
            default: false
        },
        documentary:{
            type: Boolean,
            default: false
        },
        crime:{
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

module.exports = model("Preferences", preferencesSchema);
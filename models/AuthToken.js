const mongoose = require("mongoose")

const authTokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "1h",
    },
});

const AuthToken = mongoose.model("AuthToken", authTokenSchema)

module.exports= AuthToken
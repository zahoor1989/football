const mongoose = require("mongoose");

const Player = mongoose.model(
  "Player",
  new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Number,
        required: true
    },
    squadNo: {
        type: Number,
        required: true
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    playerImage: {
        type: String,
        default: null,
        required: false
    },
    emiratesIdNo: {
        type: String,
        unique : true,
        required: true
    },
    emirateIdImage: {
        type: String,
        default: null,
        required: false
    },
    playerStatus: {
        type: String,
        default: null,
        required: false
    },
    createdBy:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    }
  })
);

module.exports = Player;

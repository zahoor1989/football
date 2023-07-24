const mongoose = require("mongoose");

const Fixture = mongoose.model(
  "Fixture",
  new mongoose.Schema({
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
      },
    awayTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
      },
    createdBy: {
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

module.exports = Fixture;
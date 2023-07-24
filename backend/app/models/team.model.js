const mongoose = require("mongoose");

const Team = mongoose.model(
  "Team",
  new mongoose.Schema({
    teamName: {
        type: String,
        unique : true,
        required: true
    },
    createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
    academyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Academy"
    },
    leagues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "League"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        required: false
    }
  })
);

module.exports = Team;
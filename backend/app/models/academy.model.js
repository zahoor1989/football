const mongoose = require("mongoose");

const Academy = mongoose.model(
  "Academy",
  new mongoose.Schema({
    academyName: {
        type: String,
        unique : true,
        required: true
    },
    user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
    academyUserName: {
        type: String,
        unique : true,
        required: false
    },
    email: {
        type: String,
        default: null,
        unique : true,
        required: false
    },
    password: {
        type: String,
        default: null,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
  })
);

module.exports = Academy;
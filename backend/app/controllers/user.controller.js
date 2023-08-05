const  ObjectId = require('mongodb').ObjectId;
const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send({ content: "Public Content." });
};

exports.userBoard = (req, res) => {
  res.status(200).json({ content: "User Content." });
};

exports.adminBoard = (req, res) => {
  res.status(200).json({ content: "Admin Content." });
};
exports.moderatorBoard = (req, res) => {
  res.status(200).json({ content: "Moderator Content."});
};

exports.getAllUsers = async (req, res) => {
  // get users
  const users = await User.find();
  res.status(200).json(users.length > 0? users : { message: 'No user found' });
};

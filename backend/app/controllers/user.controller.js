const  ObjectId = require('mongodb').ObjectId;
const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");

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

exports.getAllUsers = (req, res) => {
  // get users
   User.find().populate("roles").exec((err, users) => {
    if(err){
      return res.status(500).send({ message: err });
    }
     return res.status(200).json(users.length > 0? users : { message: 'No user found' });
   });
};

exports.createUser = async (req, res) => {
  // get users
  if( req.body && req.body['username'] && req.body['password'].length > 0) {
    // validate emirates id
    const isValidated = req.body['username'] && req.body['username'].length > 0;
    if(isValidated) {
      // check if the same eid is already in the database
      let user = await User.findOne({ email: req.body['email'] }); 
      let roles = req.body.roles.map(role => ObjectId(role));
      if (!user) {   
        const userData = new User({
          firstname: req.body['firstname'],
          lastname: req.body['lastname'],
          username: req.body['username'],
          password: bcrypt.hashSync(req.body['password'], 8),
          email: req.body['email'],
          roles: [...roles]
        });

        const  savedUser = await userData.save();
        res.status(200).json(savedUser);
      } else {
        res.status(200).json({ message: 'User already exists' });
      }
    } else {
      res.status(200).json({ message: 'Name is not valid' });
    }
  } else {
    res.status(200).json({ message: 'Username  is not valid' });
  }
};


exports.deleteUser = async (req, resp, next) => {
  try {
    const user = await User.findByIdAndDelete({ _id: ObjectId(req.params.id)});
    if(!user){
      return resp.status(200).json({message: `No record found`, type: 'error'})
    }
    return resp.status(200).json({message: `User ${user.firstName} record deleted!`})
  } catch (error) {
    next(error);
  }
};

exports.UserByIdOrEID = async (req, resp, next) => {
   try {
    const { id } = req.params;
      // check if emries id or normal id
    const userData = await Player.find({ _id: ObjectId(id) }).populate("roles").exec();
    resp.status(200).json(userData? userData : { message: 'User not found'});
  } catch (error) {
    next(error);
  }
};


exports.updateUser =  async (req, resp, next) => {
  try {
    const { id } = req.params;
    let fetchUser = await User.find({_id: ObjectId(id)});

    if (!fetchUser) return resp.status(404).json({ msg: 'User record not found' });
    fetchUser = {
      ...fetchUser,
      ...req.body
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, fetchUser, { new: true });

    resp.status(200).json(updatedUser);

  } catch (error) {
    next(error);
  }
};

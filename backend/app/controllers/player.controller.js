const  ObjectId = require('mongodb').ObjectId;
const db = require("../models");
const Player = db.player;

/* Add new employee*/
exports.createPlayer = async (req, resp, next) => {
// Emirates ID formate:  '784-1986-123456-2'
  try {
    // multiple creation
    if(req.body && Array.isArray(req.body)) {
      let insertedPlayers = [];
      for (let i = 0; i < req.body.length; i++) {
        const isValidated = req.body[i]['Emirates ID No'] && req.body[i]['Emirates ID No'].split('-').length === 4;
        if(isValidated) {
          let player = await Player.findOne({ emiratesIdNo: req.body['Emirates ID No'] }); 
          if (!player) { 
            const playerData = new Player({
              firstName: req.body[i]['First Name'],
              lastName: req.body[i]['Surname'],
              dob: new Date(req.body[i]['DOB']),
              squadNo: req.body[i]['Squad Number'],
              league_id:  ObjectId(req.body[i]['league']),
              playerImage: req.body[i]['Player Image'],
              emiratesIdNo:  req.body[i]['Emirates ID No'],
              emirateIdImage:  req.body[i]['Emirates ID Image'],
              playerStatus: req.body[i]['Status'],
              user_id: ObjectId(req.body[i].user['createdBy']),
              createdAt:  new Date()
            });
            insertedPlayers.push(req.body[i]);
            await playerData.save();
          }
        }
      };
      resp.status(200).json(insertedPlayers);

    } else if( req.body && req.body['Emirates ID No']) {
      // validate emirates id
      const isValidated = req.body['Emirates ID No'] && req.body['Emirates ID No'].split('-').length === 4;
      if(isValidated) {
        // check if the same eid is already in the database
        let player = await Player.findOne({ emiratesIdNo: req.body['Emirates ID No'] });    
        if (!player) {   
          const playerData = new Player({
            firstName: req.body['First Name'],
            lastName: req.body['Surname'],
            dob: new Date(req.body['DOB']),
            squadNo: req.body['Squad Number'],
            league_id:  ObjectId(req.body[i]['league']),
            playerImage: req.body['Player Image'],
            emiratesIdNo:  req.body['Emirates ID No'],
            emirateIdImage:  req.body['Emirates ID Image'],
            playerStatus: req.body['Status'],
            user_id: ObjectId(req.body.user['createdBy']),
            createdAt:  new Date()
          });
  
          const savedPlayer = await playerData.save();
          resp.status(200).json(savedPlayer);
        } else {
          resp.status(200).json({ message: 'Player already exists' });
        }
      }else {
        resp.status(200).json({ message: 'Emirates is not valid' });
      }
   } else {
      resp.status(200).json({ message: 'Malformed data provided' });
   }
  } catch (error) {
    next(error);
  }
};


/* GET all players listing. */
exports.getAllPlayers =  async (req, resp, next) => {
  try {
    const players = await Player.find();
    resp.status(200).json(players.length > 0? players.toJSON() : { message: 'No players found' });
  } catch (error) {
    next(error);
  }
};

/* Get employee based on id*/
exports.playerByIdOrEID = async (req, resp, next) => {
  let pl = {};
  try {
    const { id } = req.params;
    if(id.includes('-') && id.split('-').length === 4){
      // check if emries id or normal id
      pl = (await Player.findOne({ emiratesIdNo: id })).toJSON();
    } else {
      // check if emries id or normal id
      pl = (await Player.findById({ _id: ObjectId(id) })).toJSON();
    }
    resp.status(200).json(pl? pl : { message: 'Player not found'});
  } catch (error) {
    next(error);
  }
};

/* Edit existing employee based on id*/
exports.updatePlayer =  async (req, resp, next) => {
  try {
    const { id } = req.params;
    let fetchPlayer = await Player.findById({_id: ObjectId(id)});

    if (!fetchPlayer) return resp.status(404).json({ msg: 'Player record not found' });
    fetchPlayer = fetchPlayer.toJSON();
    fetchPlayer = {
      ...fetchPlayer,
      ...req.body
    }

    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, fetchPlayer, { new: true });

    resp.status(200).json(updatedPlayer);

  } catch (error) {
    next(error);
  }
};

/* Edit existing employee based on id*/
exports.approvePlayer =  async (req, resp, next) => {

  try {

    const { id } = req.params;
    let fetchPlayer = await Player.findById({_id: ObjectId(id)});

    if (!fetchPlayer) return resp.status(404).json({ message: 'Player record not found' });
    fetchPlayer = {
      ...fetchPlayer.toJSON(),
      playerStatus: req.body.playerStatus
    }
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, fetchPlayer, { new: true });

    resp.status(200).json(updatedPlayer);

  } catch (error) {
    next(error);
  }
};

/* Delete employee based on id*/
exports.deletePlayer = async (req, resp, next) => {

  try {
    const player = await Player.findByIdAndDelete({ _id: ObjectId(req.params.id)});
    if(!player){
      resp.status(200).send(`Player ${player.firstName} record deleted!`)
    }
    resp.status(200).send(`Player ${player.firstName} record deleted!`)
  } catch (error) {
    next(error);
  }
};

/* Delete all Players*/
exports.deleteAllPlayers =  async (req, resp, next) => {

  try {
    const pl = await Player.remove({});
    console.log(pl, "::: deleted records")
    resp.status(200).send(`All players records has been deleted!`)
  } catch (error) {
    next(error);
  }

};

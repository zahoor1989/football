const db = require("../models");
const Player = db.player;

/* Add new employee*/
exports.createPlayer = async (req, resp, next) => {
  const { firstName, lastName, dob, squadNo, league, playerImage, emiratesIdNo, emirateIdImage, playerStatus, createdBy  } = req.body;

  try {
    const playerData = new Player({
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      squadNo: squadNo,
      league: league,
      playerImage: playerImage,
      emiratesIdNo: emiratesIdNo,
      emirateIdImage: emirateIdImage,
      playerStatus: playerStatus,
      createdBy: createdBy,
      createdAt:  new Date()
    });

    const savedPlayer = await playerData.save();
    resp.status(200).json(savedPlayer);

  } catch (error) {
    next(error);
  }
};


/* GET all playerslisting. */
exports.getAllPlayers =  async (req, resp, next) => {

  try {
    const players = await Player.find();
    resp.status(200).json(players);
  } catch (error) {
    next(error);
  }
};

/* Get employee based on id*/
exports.getPlayerById = async (req, resp, next) => {
  try {
    const pl = await Player.findById(req.params.id);
    console.log(pl,"<<<<<<<pl")
    resp.status(200).json(pl.toJSON());
  } catch (error) {
    next(error);
  }
};

/* Edit existing employee based on id*/
exports.updatePlayer =  async (req, resp, next) => {

  try {
    const playerData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      squadNo: req.body.squadNo,
      league: req.body.league,
      playerImage: req.body.playerImage,
      emiratesIdNo: req.body.emiratesIdNo,
      emirateIdImage: req.body.emirateIdImage,
      playerStatus: req.body.playerStatus,
      createdBy: req.body.createdBy,
      createdAt: new Date()
    };

    let fetchPlayer = await Player.findById(req.params.id);

    if (!fetchPlayer) return resp.status(404).json({ msg: 'Player record not found' });

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
    
    let fetchPlayer = await Player.findById(req.params.id);

    if (!fetchPlayer) return resp.status(404).json({ msg: 'Player record not found' });
    fetchPlayer = {
      ...fetchPlayer,
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
    const pl = await Player.findByIdAndDelete(req.params.id);
    resp.status(200).send(`Player ${pl.firstName} record deleted!`)
  } catch (error) {
    next(error);
  }
};

/* Delete all Players*/
router.deleteAllPlayers =  async (req, resp, next) => {

  try {
    const pl = await employee.remove({});
    console.log(pl, "::: deleted records")
    resp.status(200).send(`All players records has been deleted!`)
  } catch (error) {
    next(error);
  }

};

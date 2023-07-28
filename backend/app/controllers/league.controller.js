const db = require("../models");
const League = db.league;

/* Add new league*/
exports.createLeague = async (req, resp, next) => {
  const { leagueName } = req.body;

  try {
    const leagueData = new League({
      leagueName: leagueName,
      leagueAgeLimit: 12,
      createdAt:  new Date()
    });

    const savedLeague = await leagueData.save();
    resp.status(200).json(savedLeague);

  } catch (error) {
    next(error);
  }
};


/* GET all Leagues. */
exports.getLeagues =  async (req, resp, next) => {
  try {
    const league = await League.find();
    resp.status(200).json(league);
  } catch (error) {
    next(error);
  }
};

/* Get League based on id*/
exports.getLeagueById = async (req, resp, next) => {
  try {
    const league = await League.findById(req.params.id);
    console.log(league,"<<<<<<<league")
    resp.status(200).json(league.toJSON());
  } catch (error) {
    next(error);
  }
};

/* Edit existing League based on id*/
exports.updateLeague =  async (req, resp, next) => {

  try {
    const leagueData = {
      leagueName: leagueName,
      leagueAgeLimit: 12,
      createdAt:  new Date()
    };

    let fetchLeague = await League.findById(req.params.id);

    if (!fetchLeague) return resp.status(404).json({ msg: 'Player record not found' });

    fetchLeague = {
      ...fetchLeague,
      ...req.body
    }

    const updatedLeague = await League.findByIdAndUpdate(req.params.id, fetchLeague, { new: true });

    resp.status(200).json(updatedLeague);

  } catch (error) {
    next(error);
  }
};


/* Delete league based on id*/
exports.deleteLeague = async (req, resp, next) => {
  try {
    const lg = await League.findByIdAndDelete(req.params.id);
    resp.status(200).send(`League ${lg.leagueName} record deleted!`)
  } catch (error) {
    next(error);
  }
};

/* Delete all Leagues*/
exports.deleteAllLeagues =  async (req, resp, next) => {
  try {
    const lg = await League.remove({});
    console.log(lg, "::: deleted records")
    resp.status(200).send(`All league records has been deleted!`)
  } catch (error) {
    next(error);
  }
};
const db = require("../models");
const Team = db.team;

/* Add new team*/
exports.createTeam = async (req, resp, next) => {
  const { teamName, createdBy, academyId, leagues  } = req.body;

  try {
    const teamData = new Team({
      teamName: teamName,
      createdBy: createdBy,
      academyId: academyId,
      leagues: leagues,
      createdAt:  new Date()
    });

    const savedTeam = await teamData.save();
    resp.status(200).json(savedTeam);

  } catch (error) {
    next(error);
  }
};


/* GET all team. */
exports.getAllTeams =  async (req, resp, next) => {
  try {
    const teams = await Team.find();
    resp.status(200).json(teams);
  } catch (error) {
    next(error);
  }
};

/* Get team based on id*/
exports.getTeamById = async (req, resp, next) => {
  try {
    const team = await Team.findById(req.params.id);
    console.log(team,"<<<<<<<team")
    resp.status(200).json(team.toJSON());
  } catch (error) {
    next(error);
  }
};

/* Edit existing team based on id*/
exports.updateTeam =  async (req, resp, next) => {

  try {
    const teamData = {
      teamName: teamName,
      createdBy: createdBy,
      academyId: academyId,
      leagues: leagues,
      createdAt:  new Date()
    };

    let fetchTeam = await Team.findById(req.params.id);

    if (!fetchTeam) return resp.status(404).json({ msg: 'Team record not found' });

    fetchTeam = {
      ...fetchTeam,
      ...req.body
    }

    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, fetchTeam, { new: true });

    resp.status(200).json(updatedTeam);

  } catch (error) {
    next(error);
  }
};


/* Delete team based on id*/
exports.deleteTeam = async (req, resp, next) => {

  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    resp.status(200).send(`Team ${team.teamName} record deleted!`)
  } catch (error) {
    next(error);
  }
};

/* Delete all Players*/
exports.deleteAllTeams =  async (req, resp, next) => {

  try {
    const team = await Team.remove({});
    resp.status(200).send(`All teams has been deleted!`)
  } catch (error) {
    next(error);
  }

};
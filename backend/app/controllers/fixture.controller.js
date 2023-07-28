const db = require("../models");
const Fixture = db.fixture;

/* Add new fixture*/
exports.createFixture = async (req, resp, next) => {
  const { homeTeam, awayTeam, createdBy } = req.body;
 
  try {
    const fixtureData = new Fixture({
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      createdBy: createdBy,
      createdAt:  new Date()
    });

    const savedFixture = await fixtureData.save();
    resp.status(200).json(savedFixture.toJSON());

  } catch (error) {
    next(error);
  }
};


/* GET all fixture listing. */
exports.getAllFixture =  async (req, resp, next) => {

  try {
    const fixture = await Fixture.find();
    resp.status(200).json(fixture.toJSON());
  } catch (error) {
    next(error);
  }
};

/* Get fixture based on id*/
exports.getFixtureById = async (req, resp, next) => {
  try {
    const fixture = await Fixture.findById(req.params.id);
    console.log(fixture,"<<<<<<<fixture")
    resp.status(200).json(fixture.toJSON());
  } catch (error) {
    next(error);
  }
};

/* Edit existing fixture based on id*/
exports.updateFixture=  async (req, resp, next) => {

  try {
    const fixtureData = {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      createdBy: createdBy,
      createdAt: new Date()
    };

    let fetchFixture = await Fixture.findById(req.params.id);

    if (!fetchFixture) return resp.status(404).json({ msg: 'Fixture record not found' });

    fetchFixture = {
      ...fetchFixture,
      ...req.body
    }

    const updatedFixture = await Fixture.findByIdAndUpdate(req.params.id, fetchFixture, { new: true });

    resp.status(200).json(updatedFixture.toJSON());

  } catch (error) {
    next(error);
  }
};

/* Edit existing fixture based on id*/
exports.approveFixture =  async (req, resp, next) => {

  try {
    let fetchFixture = await Fixture.findById(req.params.id);
    if (!fetchFixture) return resp.status(404).json({ msg: 'Player record not found' });
    fetchFixture = {
      ...fetchFixture
    }

    const updatedFixture = await Fixture.findByIdAndUpdate(req.params.id, fetchFixture, { new: true });

    resp.status(200).json(updatedFixture.toJSON());

  } catch (error) {
    next(error);
  }
};

/* Delete fixture based on id*/
exports.deleteFixture = async (req, resp, next) => {

  try {
    const fixture = await Fixture.findByIdAndDelete(req.params.id);
    resp.status(200).send(`Fixture has been record deleted!`)
  } catch (error) {
    next(error);
  }
};

/* Delete all Players*/
exports.deleteAllFixture =  async (req, resp, next) => {

  try {
    const fixture = await Fixture.deleteMany({});;
    console.log(fixture, "::: deleted records")
    resp.status(200).send(`All fixtures records has been deleted!`)
  } catch (error) {
    next(error);
  }

};
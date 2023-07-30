const ObjectId = require('mongodb').ObjectId;
const db = require("../models");
const Fixture = db.fixture;

/* Add new fixture*/
exports.createFixture = async (req, resp, next) => {
   try {
    // multiple creation
    if(req.body && Array.isArray(req.body)) {
      let insertedFixtures = [];
      for (let i = 0; i < req.body.length; i++) {
        if(req.body[i]['Home Team'] && req.body[i]['Away Team']) {
            const fixtureData = new Fixture({
                homeTeam: req.body[i]['Home Team'],
                awayTeam: req.body[i]['Away Team'],
                createdBy: ObjectId(req.body[i].user['createdBy']),
                createdAt:  new Date()
            });
            insertedFixtures.push(req.body[i]);
            await fixtureData.save();
          };
        }
      resp.status(200).json(insertedFixtures);
    } else if(req.body['Home Team'] && req.body['Away Team']) {
        const fixtureData = new Fixture({
          homeTeam: req.body['Home Team'],
          awayTeam: req.body['Away Team'],
          createdBy: ObjectId(req.body.user['createdBy']),
          createdAt:  new Date()
        });

      const savedFixture = await fixtureData.save();
      resp.status(200).json(savedFixture);
      }
  } catch (error) {
    next(error);
  }
};


/* GET all fixture listing. */
exports.getAllFixture =  async (req, resp, next) => {

  try {
    const fixture = await Fixture.find();
    resp.status(200).json( fixture.length > 0 ? fixture.toJSON() : { message: 'No fixture found' });
  } catch (error) {
    next(error);
  }

};

/* Get fixture based on id*/
exports.getFixtureById = async (req, resp, next) => {
  try {
    const fixture = await Fixture.findById({ _id: ObjectId(req.params.id) });
    resp.status(200).json(fixture.toJSON());
  } catch (error) {
    next(error);
  }
};

/* Edit existing fixture based on id*/
exports.updateFixture=  async (req, resp, next) => {

  try {
    if(req.params && req.params.id) {
    let fetchFixture = await Fixture.findById({_id: ObjectId(req.params.id)});

    if (!fetchFixture) return resp.status(404).json({ msg: 'Fixture record not found' });

    fetchFixture = {
      ...fetchFixture,
      ...req.body
    }

    const updatedFixture = await Fixture.findByIdAndUpdate(req.params.id, fetchFixture, { new: true });

    resp.status(200).json(updatedFixture.toJSON());
  } else {
    resp.status(200).json({ message: 'Fixture id is not valid or not found' });
  }

  } catch (error) {
    next(error);
  }
};


/* Delete fixture based on id*/
exports.deleteFixture = async (req, resp, next) => {
  try {
    const fixture = await Fixture.findByIdAndDelete({_id: ObjectId(req.params.id)} );
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
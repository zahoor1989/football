const db = require("../models");
const Academy = db.academy;

/* Add new employee*/
exports.createAcademy = async (req, resp, next) => {
  const { academyName, createdBy, academyUserName, email, password } = req.body;


  try {
    const AcademyData = new Academy({
      academyName: academyName,
      academyUserName: academyUserName,
      email: email,
      password: password,
      createdBy: createdBy,
      createdAt:  new Date()
    });

    const savedAcademy = await AcademyData.save();
    resp.status(200).json(savedAcademy);

  } catch (error) {
    next(error);
  }
};


/* GET all academies. */
exports.getAllAcademys =  async (req, resp, next) => {

  try {
    const academy = await Academy.find();
    resp.status(200).json(academy);
  } catch (error) {
    next(error);
  }
};

/* Get academy based on id*/
exports.getAcademyById = async (req, resp, next) => {
  try {
    const academy = await Academy.findById(req.params.id);
    console.log(academy,":::: academy")
    resp.status(200).json(academy.toJSON());
  } catch (error) {
    next(error);
  }
};

/* Edit existing academy based on id*/
exports.updateAcademy =  async (req, resp, next) => {

  try {
    const academyData = {
      academyName: req.body.academyName,
      academyUserName: req.body.academyUserName,
      email: req.body.email,
      password: req.body.password,
      createdBy: req.body.createdBy,
      createdAt: new Date()
    };

    let fetchAcademy = await Academy.findById(req.params.id);

    if (!fetchAcademy) return resp.status(404).json({ msg: 'Academy record not found' });

    fetchAcademy = {
      ...fetchAcademy,
      ...req.body
    }

    const updatedAcademy = await Academy.findByIdAndUpdate(req.params.id, fetchAcademy, { new: true });

    resp.status(200).json(updatedAcademy);

  } catch (error) {
    next(error);
  }
};


/* Delete Academy based on id*/
exports.deleteAcademy = async (req, resp, next) => {

  try {
    const academy = await Academy.findByIdAndDelete(req.params.id);
    resp.status(200).send(`Academy ${academy.academyName} record deleted!`)
  } catch (error) {
    next(error);
  }
};

/* Delete all Academy*/
exports.deleteAllAcademys =  async (req, resp, next) => {

  try {
    const academy = await Academy.remove({});
    console.log(academy, "::: deleted records")
    resp.status(200).send(`All academy records has been deleted!`)
  } catch (error) {
    next(error);
  }

};
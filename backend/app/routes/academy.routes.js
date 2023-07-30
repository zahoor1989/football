const express = require("express");
const router = express.Router();

const academy = require("../controllers/academy.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/academy/create", academy.createAcademy);

app.get("/academy/all", academy.getAllAcademys);

app.get("/academy/:id", academy.getAcademyById);

app.post("/academy/update/:id", academy.updateAcademy);

app.post("/academy/delete/:id", academy.deleteAcademy);

app.post("/academy/delete/all", academy.deleteAllAcademys);

};


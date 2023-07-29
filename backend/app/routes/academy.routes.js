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

app.post("/create", academy.createAcademy);

app.get("/all", academy.getAllAcademys);

app.get("/:id", academy.getAcademyById);

app.post("/update/:id", academy.updateAcademy);

app.post("/delete/:id", academy.deleteAcademy);

app.post("/delete/all", academy.deleteAllAcademys);

};


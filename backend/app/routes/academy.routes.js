const express = require("express");
const router = express.Router();


const academy = require("../controllers/academy.controller");

router.post("/api/academy/create", academy.createAcademy);

router.get("/api/academy/all", academy.getAllAcademys);

router.get("/api/academy/:id", academy.getAcademyById);

router.post("/api/academy/update/:id", academy.updateAcademy);

router.post("/api/academy/delete/:id", academy.deleteAcademy);

router.post("/api/academy/delete/all", academy.deleteAllAcademys);


module.exports = router;


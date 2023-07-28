const express = require("express");
const router = express.Router();


const controller = require("../controllers/league.controller");

router.post("/create", controller.createLeague);

router.get("/all", controller.getLeagues);

router.get("/:id", controller.getLeagueById);

router.post("/approve/:id", controller.updateLeague);

router.post("/delete/:id", controller.deleteLeague);

router.post("/delete/all", controller.deleteAllLeagues);


  module.exports = router;
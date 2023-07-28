const express = require("express");
const router = express.Router();

const team = require("../controllers/team.controller");

router.post("/create", team.createTeam);

router.get("/all", team.getAllTeams);

router.get("/:id", team.getTeamById);

router.post("/update/:id", team.updateTeam);

router.post("/delete/:id", team.deleteTeam);

router.post("/delete/all", team.deleteAllTeams);

module.exports = router;

const express = require("express");
const router = express.Router();

const player = require("../controllers/player.controller");

router.post("/create", player.createPlayer);

router.get("/all", player.getAllPlayers);

router.get("/:id", player.getPlayerById);

router.post("/approve/:id", player.approvePlayer);

router.post("/update/:id", player.updatePlayer);

router.post("/delete/:id", player.deletePlayer);

router.post("/delete/all", player.deleteAllPlayers);

module.exports = router;

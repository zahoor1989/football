const express = require("express");
const router = express.Router();


const fixture = require("../controllers/fixture.controller");

router.post("/create", fixture.createFixture);

router.get("/all", fixture.getAllFixture);

router.get("/:id", fixture.getFixtureById);

router.post("/approve/:id", fixture.updateFixture);

router.post("/update/:id", fixture.approveFixture);

router.post("/delete/:id", fixture.deleteFixture);

router.post("/delete/all", fixture.deleteAllFixture);

module.exports = router;

const league = require("../controllers/league.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/create", league.createLeague);

app.get("/all", league.getLeagues);

app.get("/:id", league.getLeagueById);

app.post("/approve/:id", league.updateLeague);

app.post("/delete/:id", league.deleteLeague);

app.post("/delete/all", league.deleteAllLeagues);

};
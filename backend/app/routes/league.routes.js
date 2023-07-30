const league = require("../controllers/league.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/league/create", league.createLeague);

app.get("/league/all", league.getLeagues);

app.get("/league/:id", league.getLeagueById);

app.post("/league/update/:id", league.updateLeague);

app.post("/league/delete/:id", league.deleteLeague);

app.post("/league/delete/all", league.deleteAllLeagues);

};
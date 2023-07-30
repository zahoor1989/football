const team = require("../controllers/team.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
app.post("/team/create", team.createTeam);

app.get("/team/all", team.getAllTeams);

app.get("/team/:id", team.getTeamById);

app.post("/team/update/:id", team.updateTeam);

app.post("/team/delete/:id", team.deleteTeam);

app.post("/team/delete/all", team.deleteAllTeams);

};

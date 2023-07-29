const team = require("../controllers/team.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
app.post("/create", team.createTeam);

app.get("/all", team.getAllTeams);

app.get("/:id", team.getTeamById);

app.post("/update/:id", team.updateTeam);

app.post("/delete/:id", team.deleteTeam);

app.post("/delete/all", team.deleteAllTeams);

};

const player = require("../controllers/player.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/player/create", isAuthenticated, player.createPlayer);

app.get("/player/all", isAuthenticated, player.getAllPlayers);

app.get("/player/:id", isAuthenticated, player.playerByIdOrEID);

app.post("/player/approve/:id", isAuthenticated, player.approvePlayer);

app.post("/player/update/:id", isAuthenticated, player.updatePlayer);

app.post("/player/delete/:id", isAuthenticated, player.deletePlayer);

app.post("/player/delete/all", isAuthenticated, player.deleteAllPlayers);

};

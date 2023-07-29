const player = require("../controllers/player.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/create", player.createPlayer);

app.get("/all", player.getAllPlayers);

app.get("/:id", player.getPlayerById);

app.post("/approve/:id", player.approvePlayer);

app.post("/update/:id", player.updatePlayer);

app.post("/delete/:id", player.deletePlayer);

app.post("/delete/all", player.deleteAllPlayers);

};

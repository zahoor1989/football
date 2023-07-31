const { authJwt } = require("../middlewares/");
const player = require("../controllers/player.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/player/create", authJwt.isAuthenticated, player.createPlayer);

app.get("/player/all", authJwt.isAuthenticated, player.getAllPlayers);

app.get("/player/:id", authJwt.isAuthenticated, player.playerByIdOrEID);

app.post("/player/approve/:id", authJwt.isAuthenticated, player.approvePlayer);

app.post("/player/update/:id", authJwt.isAuthenticated, player.updatePlayer);

app.post("/player/delete/:id", authJwt.isAuthenticated, player.deletePlayer);

app.post("/player/delete/all", authJwt.isAuthenticated, player.deleteAllPlayers);

};

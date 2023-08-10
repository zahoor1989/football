const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/content", controller.allAccess);

  app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/users/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );
  app.post(
    "/api/users/create",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createUser
  );

app.get("/api/users/:id", authJwt.isAuthenticated, controller.UserByIdOrEID);

app.post("/api/users/update/:id", authJwt.isAuthenticated, controller.updateUser);

app.post("/api/users/delete/:id", authJwt.isAuthenticated, controller.deleteUser);
};


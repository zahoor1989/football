const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { client } = require("../config/auth.config");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', [client]);
    res.header('Access-Control-Allow-Methods', "OPTIONS, DELETE, POST, GET, PATCH, PUT");
    res.header('Access-Control-Allow-Credentials', "true")
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Max-Age', 1728000);   
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);
};

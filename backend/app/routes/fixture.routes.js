const fixture = require("../controllers/fixture.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/fixture/create", fixture.createFixture);

app.get("/fixture/all", fixture.getAllFixture);

app.get("/fixture/:id", fixture.getFixtureById);

app.post("/fixture/approve/:id", fixture.updateFixture);

app.post("/fixture/update/:id", fixture.approveFixture);

app.post("/fixture/delete/:id", fixture.deleteFixture);

app.post("/fixture/delete/all", fixture.deleteAllFixture);

};
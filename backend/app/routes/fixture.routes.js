const fixture = require("../controllers/fixture.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/create", fixture.createFixture);

app.get("/all", fixture.getAllFixture);

app.get("/:id", fixture.getFixtureById);

app.post("/approve/:id", fixture.updateFixture);

app.post("/update/:id", fixture.approveFixture);

app.post("/delete/:id", fixture.deleteFixture);

app.post("/delete/all", fixture.deleteAllFixture);

};
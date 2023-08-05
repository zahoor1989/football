const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

const morgan  = require('morgan');

const app = express();

const secret = require("./app/config/auth.config");

app.use(morgan('tiny'));
app.use(cors());
/* for Angular Client (withCredentials) */
app.use(
  cors({
    'Access-Control-Allow-Credentials': true,
    origin:"http://localhost:4200",
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "football-session",
    keys: [secret],
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to football management application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/academy.routes")(app);
require("./app/routes/fixture.routes")(app);
require("./app/routes/league.routes")(app);
require("./app/routes/player.routes")(app);
require("./app/routes/team.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "coach"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'coach' to roles collection");
      });

      new Role({
        name: "referee"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'referee' to roles collection");
      });
    }
  });
}

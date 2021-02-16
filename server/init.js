const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");
app.get("/", (req, res) => res.send("Personal Web App"));
app.use(cors());
app.options("*", cors()); // Disable CORS Policy
app.use(bodyParser.json());

const {database, user, password, host, portDB} = require("./db");

//app.listen(port, () => console.log(`pwp-app listening on port ${port}!`));

const Sequelize = require("sequelize");
/*
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});
*/
const sequelize = new Sequelize(database, user, password, {
  host,
  portDB,
  dialect: 'postgres',
  logging: false
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const init = {};

init.sequelize = sequelize;
init.Sequelize = Sequelize;
init.app = app;
init.port = port;
module.exports = init;

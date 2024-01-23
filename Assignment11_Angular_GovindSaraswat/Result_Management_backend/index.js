const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

const db = require("./dbconnection");

// database connection
db.connect((err) => {
  if (err) {
    console.log("db connection failue ...");
  } else {
    console.log("database connected ...");
  }
});

// router path
const routes = require("./router/router");

// bodyparser
app.use(bodyparser.json());

// applying cors
app.use(cors());

// routes
app.use("/api", routes);

// server
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`backend server started at ${port} ...`);
});

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const img = require("./controllers/img");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it is working!");
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put("./img", (req, res) => {
  img.handleImage(req, res, db);
});
app.post("./imgurl", (req, res) => {
  img.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("app is running on port 3000 ${process.env.PORT}");
});

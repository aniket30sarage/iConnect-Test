const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models/index");
const { auth } = require("./middleware/auth");
console.log("auth", auth);
const {
  create,
  login,
} = require("./controllers/usersController");

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.connect(db.url, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("MongoDB connected successfully.");
  } else {
    console.log("Error in the DB connection:", err);
  }
});

app.post("/signup", create);

app.post("/login", login);

app.listen(3000, () => {
  console.log("Express server started at port : 3000");
});

const mongoose = require("mongoose");

const dbConfig = require("../config/db.config");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("../models/user.model");
console.log("db.users", db.users);

module.exports = db;

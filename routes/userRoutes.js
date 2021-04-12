const express = require("express");
const app = express();

module.exports = app => {
	const users = require("../controllers/usersController");
	console.log("users", users);
	let router = require("express").Router();

	router.post("/", users.create())

	app.use("/api/user", router);
}

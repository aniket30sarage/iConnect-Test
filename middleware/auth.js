const jwt = require("jsonwebtoken");
const config = require("../config/default.json");
const atob = require("atob");

const auth = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) return res.status(401).send("Access Denied: No token provided.");
	try {
		let jwtData = token.split(".")[1];

		req.token = jwtData;
		next();
		const decodedToken = await jwt.verify(jwtData, config.myprivatekey);
	} catch (err) {
		console.log("err", err);
		res.sendStatus(403);
	}
};

module.exports = auth;

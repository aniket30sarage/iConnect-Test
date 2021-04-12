const mongoose = require("mongoose");
const can = require("../config/roles");

let userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: String,
		password: {
			type: String,
			required: true,
		},
		accessToken: String,
	},
	{
		timestamps: true,
	}
);

const usersModel = mongoose.model("usersModel", userSchema, "users");
module.exports = usersModel;

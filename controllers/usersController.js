const User = require("../models/user.model");
const config = require("../config/default.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const myprivatekey = require("../config/default.json");

const generateHash = async (password) => await bcrypt.hash(password, 10);

const validatePassword = async (plainPassword, hashPassword) =>
	await bcrypt.compare(plainPassword, hashPassword);

export const create = async (req, res, next) => {
	const { firstName, lastName, email, password, role } = req.body;
	const hashedPassword = await generateHash(password);
	const user = new User({
		firstName,
		lastName,
		email,
		password: hashedPassword,
		role: role || "guest",
	});
	const accessToken = jwt.sign({ userId: user._id, role: user.role }, config.myprivatekey, {
		expiresIn: "2d",
	});
	user.accessToken = accessToken;
	try {
		await user.save();
		res.json({
			data: user,
			accessToken,
		});
		console.log("post successfully", user);
	} catch (err) {
		res.status(500).send(err);
		next(err);
	}
};

export const getToken = async (req, res) => {
	const { email, password } = req.body;
	const user = User.find((u) => {
		return u.email === email && u.password === password;
	});
	if (user) {
		const accessToken = jwt.sign(
			{ email: user.email, role: user.role },
			myprivatekey
		);
		res.json({
			accessToken,
		});
	} else {
		res.send("email and password incorrect");
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		let isValid = await validatePassword(password, user.password);
		if (!isValid) return next(new Error("password not correct"));
		const accessToken = jwt.sign({ userId: user._id }, config.myprivatekey, {
			expiresIn: "2d",
		});
		await User.findByIdAndUpdate(user._id, { accessToken });
		res.status(200).json({
			data: { email: user.email, role: user.role },
			accessToken,
		});
	} catch (err) {
		next(err);
	}
};

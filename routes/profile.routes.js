const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const User = require("../models/User.model");
const Driver = require("../models/Driver.model");
const Team = require("../models/Team.model");
const axios = require("axios");

let driversApi = axios.get("http://ergast.com/api/f1/2022/drivers.json");

router.get("/profile", isLoggedIn, (req, res) => {
	res.render("profile/profile", { user: req.session.user });
});

router.get("/profile/getdrivers", isLoggedIn, async (req, res) => {
	randomDriver = await driversApi;
	let randNum = Math.floor(Math.random() * 19);
	console.log(randomDriver.data.MRData.DriverTable.Drivers[randNum]);
	let randomResult = randomDriver.data.MRData.DriverTable.Drivers[randNum];
	res.render("profile/getdrivers", { randomResult });
});

module.exports = router;

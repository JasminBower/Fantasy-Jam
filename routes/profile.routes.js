const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const User = require("../models/User.model");
const Team = require("../models/Team.model");
const axios = require("axios");
const getRandom = require("../utils/getRandom");
const mongoose = require("mongoose");
const capitalized = require("../utils/capitalized");
const app = require("../app");

let driversApi = axios.get(
	"http://ergast.com/api/f1/2022/driverStandings.json",
);
//const driversData = driversApi.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
// let driversPoints = axios.get(`http://ergast.com/api/f1/drivers/${driverName}/driverStandings.json`)

router.get("/profile", isLoggedIn, async (req, res) => {
	let [currentUser] = await Team.find({ username: req.session.user.username });
	if (currentUser) {
		//console.log(currentUser, req.session);
		let driver1Id = currentUser.driver1Id;
		let driver2Id = currentUser.driver2Id;
		let driver3Id = currentUser.driver3Id;
		let driversApi = await axios.get(
			"http://ergast.com/api/f1/2022/driverStandings.json",
		);
		let driversData =
			driversApi.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
		let filterDrivers = driversData.filter((elem) => {
			let currentDriverId = elem.Driver.familyName;
			//console.log(elem.Driver.familyName)
			if (
				currentDriverId === driver1Id ||
				currentDriverId === driver2Id ||
				currentDriverId === driver3Id
			) {
				return elem;
			}
		});

		//console.log(filterDrivers,  "FILTER");
		let totalScore = filterDrivers.reduce((acc, elem) => {
			return acc + Number(elem.points);
		}, 0);
		let updatedTeams = await Team.findOneAndUpdate(
			{ username: req.session.user.username },
			{ teamScore: totalScore },
			{ new: true },
		);
		//console.log("UPDATEDDDDDDDDDDDDDD", req.session.user.username);
		res.render("profile/profile", { currentUser, totalScore });
	} else {
		res.redirect("/getdrivers");
	}
});

router.get("/getdrivers", isLoggedIn, async (req, res) => {
	let randomDriver = await driversApi;
	const drivers =
		randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
	let randomResult = drivers[getRandom(20)];
	const filteredDrivers = drivers.filter((driver) => {
		if (driver != randomResult) {
			return driver;
		}
	});

	res.render("profile/getdrivers", { randomResult, filteredDrivers });
});

router.post("/getdrivers", isLoggedIn, async (req, res) => {
	//console.log(req.body, "<<<<<<<<<<<<<<");
	const newTeam = {
		username: req.session.user.username,
		driver1Id: req.body.driver1Id,
		driver2Id: req.body.driver2Id,
		driver3Id: req.body.driver3Id,

		//totalScore: req.body.totalScore
	};
	await Team.create(newTeam);
	//	console.log(newTeam);
	res.redirect("/profile");
});

module.exports = router;

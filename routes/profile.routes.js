const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const User = require("../models/User.model");
const Driver = require("../models/Driver.model");
const Team = require("../models/Team.model");
const axios = require("axios");

let driversApi = axios.get("http://ergast.com/api/f1/2022/driverStandings.json");

router.get("/profile", isLoggedIn, (req, res) => {
	res.render("profile/profile", { user: req.session.user });
});


router.get("/getdrivers",isLoggedIn, async (req,res) => {
   
    res.render("profile/getdrivers");


});
router.get("/randomdriver",isLoggedIn, async (req,res) => {
  res.render("profile/randomdriver");
});

router.post("/randomdriver",isLoggedIn, async (req,res) => {
randomDriver = await driversApi;
let randNum = Math.floor(Math.random() * 19)
console.log(randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[randNum].Driver);
let randomResult = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[randNum]//.points//.Driver
//let randomResult = randomDriver.data.MRData.DriverTable.Drivers[randNum];
res.render("profile/randomdriver", {randomResult});
});


module.exports = router;

const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const User = require('../models/User.model');
const Driver = require("../models/Driver.model");
const Team = require('../models/Team.model');
const axios = require('axios');
const getRandom = require("../utils/getRandom");

let driversApi = axios.get("http://ergast.com/api/f1/2022/driverStandings.json");

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile/profile", { user: req.session.user });
});

router.get("/getdrivers", isLoggedIn, async (req, res) => {
  let teamArray = [];
  randomDriver = await driversApi;
  let randomResult =  randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[getRandom(20)]
  // let randomResult2 = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[getRandom(20)]
  // let randomResult3 = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[getRandom(20)]
  teamArray.push(randomResult.Driver.familyName)
  console.log(randomResult);
  res.render("profile/getdrivers", {randomResult});
  // const button1 = document.getElementById("button").addEventListener("click", randomResult);
  // const button2 = document.getElementById("button2").addEventListener("click", randomResult2);
  // const button3 = document.getElementById("button3").addEventListener("click", randomResult3);
 });

 router.post("/getdrivers", isLoggedIn, async (req, res) => {
  console.log(req.session)
  const newTeam = {username:req.session.user.username, driverId: req.body.driverId}
  Team.create(newTeam);
  res.redirect("/profile",);
  });





module.exports = router;
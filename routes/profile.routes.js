const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const User = require('../models/User.model');
const Driver = require("../models/Driver.model");
const Team = require('../models/Team.model');
const axios = require('axios');
const getRandom = require("../utils/getRandom");
const mongoose = require("mongoose");

let driversApi = axios.get("http://ergast.com/api/f1/2022/driverStandings.json");

router.get("/profile", isLoggedIn, async (req, res) => {
let [userTeam] = await Team.find({user: req.session.username})
//console.log();
res.render("profile/profile", { user: req.session.user , userTeam});
});

router.get("/getdrivers", isLoggedIn, async (req, res) => {
  
  let randomDriver = await driversApi;
  let randomResult = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[getRandom(20)]
  let driverResult2 = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  let driverResult3 = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  res.render("profile/getdrivers", { randomResult, driverResult2, driverResult3 });
});

router.post("/getdrivers", isLoggedIn, async (req, res) => {
  //console.log(req.body.driver3Id ,"HEY!!!!!!")
  const newTeam = {username: req.session.user.username, driver1Id: req.body.driver1Id, driver2Id: req.body.driver2Id, driver3Id: req.body.driver3Id }
  Team.create(newTeam);
  console.log(newTeam);
  res.render("profile/profile");
});





module.exports = router;
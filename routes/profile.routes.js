const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const User = require('../models/User.model');
const Driver = require("../models/Driver.model");
const Team = require('../models/Team.model');
const axios = require('axios');
const getRandom = require("../utils/getRandom");
const mongoose = require("mongoose");


let driversApi = axios.get("http://ergast.com/api/f1/2022/driverStandings.json");
//const driversData = driversApi.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
// let driversPoints = axios.get(`http://ergast.com/api/f1/drivers/${driverName}/driverStandings.json`)

router.get("/profile", isLoggedIn, async (req, res) => {
let [userTeam]= await Team.find({user: req.session.username})
let driver1Id = userTeam.driver1Id
let driver2Id = userTeam.driver2Id
let driver3Id = userTeam.driver3Id
let driversApi = await axios.get("http://ergast.com/api/f1/2022/driverStandings.json");
let driversData = driversApi.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
let filterDrivers = driversData.filter((elem)=>{
let currentDriverId = elem.Driver.driverId
if(currentDriverId === driver1Id || currentDriverId === driver2Id || currentDriverId === driver3Id){
return elem
}
})
console.log(filterDrivers, "FILTER");


res.render("profile/profile", { user: req.session.user , userTeam});
});

router.get("/getdrivers", isLoggedIn, async (req, res) => {
  let randomDriver = await driversApi;
  let randomResult = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[getRandom(20)]
  let driverResult = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  //let driverResult3 = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  //let points = randomDriver.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
  res.render("profile/getdrivers", { randomResult, driverResult});
});



router.post("/getdrivers", isLoggedIn, async (req, res) => {
  //console.log(req.body.driverId)
  const newTeam = {username: req.session.user.username, driver1Id: req.body.driver1Id, driver2Id: req.body.driver2Id, driver3Id: req.body.driver3Id }
  await Team.create(newTeam);
  console.log(newTeam);
  res.render("profile/profile");
});





module.exports = router;
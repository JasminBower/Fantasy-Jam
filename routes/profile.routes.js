const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const User = require('../models/User.model');
const Driver = require("../models/Driver.model");
const Team = require('../models/Team.model');


router.get("/profile", isLoggedIn, (req, res) => {
    res.send("profile/profile", {user: req.session.user});
  });

  module.exports = router;
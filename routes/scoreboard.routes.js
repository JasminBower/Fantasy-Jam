const router = require("express").Router();
const data = require("../dummyData");
const Team = require("../models/Team.model");
const findWinner = require("../utils/findWinner");

//get user teams
// sort and render
// *** highlight current user position

router.get("/scoreboard", async (req, res, next) => {
	let teams = await Team.find();
	let sortedTeams = teams.sort((a, b) => {
		return b.teamScore - a.teamScore;
	});

	res.render("auth/scoreboard", { sortedTeams });
});

// router.post("/scoreboard", (req, res, next) => {
// 	const { team } = req.body;
// 	res.render(team);
// });

module.exports = router;

const router = require("express").Router();
const data = require("../dummyData");
const Team = require("../models/Team.model");
const Comment = require("../models/Comment.model");
const findWinner = require("../utils/findWinner");

//get user teams
// sort and render
// *** highlight current user position

router.get("/scoreboard", async (req, res, next) => {
	let teams = await Team.find();
	let sortedTeams = teams.sort((a, b) => {
		return b.teamScore - a.teamScore;
	});

	const winner = sortedTeams[0].username;

	res.render("auth/scoreboard", { sortedTeams, winner });
});

router.post("/scoreboard", async (req, res, next) => {
	const { comment } = req.body;
	let newComment = {
		username,
		comment: comment,
	};

	let comments = await Comment.create(newComment);

	res.render("auth/scoreboard", comments);
});

module.exports = router;

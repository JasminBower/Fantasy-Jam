const router = require("express").Router();
const data = require("../dummyData");
const Team = require("../models/Team.model");
const Comment = require("../models/Comment.model");
const findWinner = require("../utils/findWinner");

//get user teams
// sort and render
// *** highlight current user position

router.get("/scoreboard", async (req, res, next) => {
	let allComments = await Comment.find();
	let teams = await Team.find();
	let sortedTeams = teams.sort((a, b) => {
		return b.teamScore - a.teamScore;
	});

	const winner = sortedTeams[0].username;

	res.render("auth/scoreboard", { sortedTeams, winner, allComments });
});

router.post("/scoreboard", async (req, res, next) => {
	const { comment } = req.body;
	let newComment = {
		username: req.session.user.username,
		comment: comment,
	};
	console.log(newComment);
	let comments = await Comment.create(newComment);

	res.redirect("/scoreboard");
});

module.exports = router;

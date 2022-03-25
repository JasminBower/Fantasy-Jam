const router = require("express").Router();
const data = require("../dummyData");
const Team = require("../models/Team.model");
const Comment = require("../models/Comment.model");
const findWinner = require("../utils/findWinner");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/scoreboard", isLoggedIn, async (req, res, next) => {
	let allComments = await Comment.find();
	let teams = await Team.find();
	let currentUser = req.session.user.username;

	const mappedComments = allComments.map((comment) => {
		if (currentUser == comment.username) {
			comment.isCurrentUser = true;
			return comment;
		} else {
			comment.isCurrentUser = false;
			return comment;
		}
	});

	console.log(mappedComments);

	let sortedTeams = teams.sort((a, b) => {
		return b.teamScore - a.teamScore;
	});

	let winner = sortedTeams[0].username;

	if (winner == req.session.user.username) {
		winner = "You";
	}

	res.render("auth/scoreboard", {
		sortedTeams,
		winner,
		mappedComments,
		currentUser,
	});
});

router.post("/scoreboard", isLoggedIn, async (req, res, next) => {
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

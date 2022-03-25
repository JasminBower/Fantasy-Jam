const router = require("express").Router();
const Team = require("../models/Team.model");
const Comment = require("../models/Comment.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/scoreboard", isLoggedIn, async (req, res, next) => {
	let allComments = await Comment.find();
	let teams = await Team.find();
	let currentUser = req.session.user.username;

	const mappedComments = allComments.map((comment) => {
		let newDate = String(comment.updatedAt).split(" ").slice(1, 5);
		newDate.splice(3, 0, " at ");
		comment.time = newDate.join(" ");
		if (currentUser == comment.username) {
			comment.isCurrentUser = true;
			return comment;
		} else {
			comment.isCurrentUser = false;
			return comment;
		}
	});

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
		time: "",
	};
	console.log(newComment);
	await Comment.create(newComment);

	res.redirect("/scoreboard");
});

router.delete("/scoreboard/:id", async (req, res, next) => {
	console.log("am I here???>");
	let username = req.session.user.username;
	let { id } = req.params;

	console.log(req.params, req.body);

	console.log(username, id);

	if (username) {
		await Comment.findByIdAndDelete(id);
	}
	res.redirect("/scoreboard");
});

module.exports = router;

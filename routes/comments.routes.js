const router = require("express").Router();
const Team = require("../models/Team.model");
const Comment = require("../models/Comment.model");

router.get("/comments/:id", async (req, res, next) => {
	let username = req.session.user.username;
	//console.log(req.params, "<<<");
	let { id } = req.params;
	let comment = await Comment.findById(id);
	//console.log(comment, "CHEEEESE");

	res.render("auth/comments", { username, comment });
});

router.post("/comments/:id", async (req, res, next) => {
	let { comment } = req.body;
	let { id } = req.params;

	await Comment.findByIdAndUpdate(id, { comment }, { new: true });

	res.redirect("/scoreboard");
});

module.exports = router;
